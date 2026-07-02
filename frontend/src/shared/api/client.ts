import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/env";
import type { ApiResponse } from "./types";

/**
 * Central Axios instance.
 * - Attaches auth token when present.
 * - Injects X-Request-ID (client-generated) → backend echoes back.
 * - Unwraps ApiResponse envelope (returns data / throws ApiClientError on failure).
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// --- Request: attach auth + request id ---
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  config.headers.set("X-Request-ID", generateRequestId());
  return config;
});

// --- Response: unwrap envelope + normalise errors ---
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<never>>) => {
    if (error.response?.status === 401) {
      // TODO: refresh token flow once auth lands.
      clearAccessToken();
    }

    const envelope = error.response?.data;
    const apiError: ApiClientError = new ApiClientError(
      envelope?.error?.message ?? error.message ?? "Request failed",
      {
        status: error.response?.status ?? 0,
        code: envelope?.error?.code ?? "network_error",
        details: envelope?.error?.details,
        requestId: envelope?.request_id,
      },
    );
    return Promise.reject(apiError);
  },
);

// --- Helpers ---
export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;
  requestId?: string;

  constructor(
    message: string,
    opts: { status: number; code: string; details?: Record<string, unknown>; requestId?: string },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
    this.requestId = opts.requestId;
  }
}

/**
 * Extract `data` from ApiResponse envelope.
 * Every feature-level api function should end with `.then(unwrap<T>)`.
 */
export function unwrap<T>(response: { data: ApiResponse<T> }): T {
  const body = response.data;
  if (!body.success || body.data === undefined) {
    throw new ApiClientError(body.error?.message ?? "Empty response", {
      status: 200,
      code: body.error?.code ?? "empty_response",
      details: body.error?.details,
      requestId: body.request_id,
    });
  }
  return body.data;
}

// --- Token store (in-memory + localStorage bridge — swap for secure store later) ---
const TOKEN_KEY = "aip.access_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function generateRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
