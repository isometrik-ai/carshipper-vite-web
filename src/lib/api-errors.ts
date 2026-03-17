/**
 * Structured API error classes for consistent error handling.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly statusText?: string,
    public readonly url?: string
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class TimeoutError extends ApiError {
  constructor(message = "Request timed out", url?: string) {
    super(message, undefined, undefined, url);
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class NetworkError extends ApiError {
  constructor(message = "Network request failed", url?: string, cause?: unknown) {
    super(message, undefined, undefined, url);
    this.name = "NetworkError";
    this.cause = cause;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class HttpError extends ApiError {
  constructor(
    message: string,
    statusCode: number,
    statusText?: string,
    url?: string,
    public readonly body?: unknown
  ) {
    super(message, statusCode, statusText, url);
    this.name = "HttpError";
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export function isRetryableError(error: unknown): boolean {
  if (error instanceof NetworkError || error instanceof TimeoutError) return true;
  if (error instanceof HttpError) return error.statusCode >= 500;
  return false;
}
