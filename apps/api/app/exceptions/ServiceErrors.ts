import ApplicationException from "./ApplicationException.js"

export class BadRequestError extends ApplicationException {
  constructor(message: string) {
    super(message, 400, "BAD_REQUEST")
  }
}

export class ConflictError extends ApplicationException {
  constructor(message: string) {
    super(message, 409, "CONFLICT")
  }
}

export class NotFoundError extends ApplicationException {
  constructor(message: string) {
    super(message, 404, "NOT_FOUND")
  }
}

/**
 * Raised when a merchant URL is given but its host isn't in the supported
 * registry, or the URL isn't a parseable product page. The frontend shows a
 * "site non compatible" hint rather than a generic error.
 */
export class UnsupportedMerchantError extends ApplicationException {
  constructor(message = "Ce site n'est pas encore pris en charge pour l'extraction automatique") {
    super(message, 422, "UNSUPPORTED_MERCHANT")
  }
}

export class ValidationError extends ApplicationException {
  constructor(message: string) {
    super(message, 422, "VALIDATION_ERROR")
  }
}

export class UnauthorizedError extends ApplicationException {
  constructor(message: string) {
    super(message, 401, "UNAUTHORIZED")
  }
}

export class ForbiddenError extends ApplicationException {
  constructor(message: string) {
    super(message, 403, "FORBIDDEN")
  }
}

export class InternalServerError extends ApplicationException {
  constructor(message: string) {
    super(message, 500, "INTERNAL_ERROR")
  }
}

/**
 * Raised when a dependency required to serve the request is temporarily down
 * (e.g. the Chroma/Ollama search stack). Maps to 503 so clients can retry.
 */
export class ServiceUnavailableError extends ApplicationException {
  constructor(message: string) {
    super(message, 503, "SERVICE_UNAVAILABLE")
  }
}
