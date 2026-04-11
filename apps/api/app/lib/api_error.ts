import type { HttpContext } from "@adonisjs/core/http"

import ApplicationException from "#exceptions/ApplicationException"

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR"

export type ApiErrorPayload = {
  success: false
  error: {
    code: ErrorCode
    message: string
  }
}

export function makeErrorPayload(code: ErrorCode, message: string): ApiErrorPayload {
  return {
    success: false,
    error: {
      code,
      message,
    },
  }
}

export function sendError(
  response: HttpContext["response"],
  status: number,
  code: ErrorCode,
  message: string,
) {
  return response.status(status).send(makeErrorPayload(code, message))
}

export function throwHttpError(status: number, code: ErrorCode, message: string): never {
  throw new ApplicationException(message, status, code)
}
