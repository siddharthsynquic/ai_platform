/** Mirrors backend `ApiResponse` envelope (see app/utils/response.py). */

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, unknown>;
  request_id: string;
}
