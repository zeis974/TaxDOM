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
