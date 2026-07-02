import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearAccessToken, setAccessToken } from "./client";

/**
 * Auth refresh coordinator.
 *
 * Behaviour:
 * - Multiple concurrent requests get a single `refreshPromise` — no thundering herd.
 * - On refresh success: retry queued requests with new token.
 * - On refresh failure: clear token, redirect to /login.
 *
 * Wire the actual `/auth/refresh` call in `refreshAccessToken` when backend endpoint lands.
 */

type QueuedRequest = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

let refreshPromise: Promise<string> | null = null;
const queue: QueuedRequest[] = [];

async function refreshAccessToken(): Promise<string> {
  // TODO: replace with real refresh call once backend supports it.
  // Example:
  // const res = await axios.post<ApiResponse<{ access_token: string }>>(
  //   `${env.VITE_API_BASE_URL}/auth/refresh`,
  //   {},
  //   { withCredentials: true },
  // );
  // return res.data.data!.access_token;
  throw new Error("Refresh not implemented");
}

function flushQueue(error: unknown | null, token: string | null): void {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  queue.length = 0;
}

/**
 * Install refresh handler on an Axios instance.
 * Call once at startup after creating apiClient.
 */
export function installAuthRefresh(client: AxiosInstance): void {
  client.interceptors.response.use(
    (r) => r,
    async (error: AxiosError) => {
      const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
      if (!original || error.response?.status !== 401 || original._retry) {
        return Promise.reject(error);
      }
      original._retry = true;

      if (refreshPromise) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              original.headers.set("Authorization", `Bearer ${token}`);
              resolve(client(original));
            },
            reject,
          });
        });
      }

      refreshPromise = refreshAccessToken()
        .then((token) => {
          setAccessToken(token);
          flushQueue(null, token);
          return token;
        })
        .catch((err) => {
          flushQueue(err, null);
          clearAccessToken();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          throw err;
        })
        .finally(() => {
          refreshPromise = null;
        });

      const token = await refreshPromise;
      original.headers.set("Authorization", `Bearer ${token}`);
      return client(original);
    },
  );
}
