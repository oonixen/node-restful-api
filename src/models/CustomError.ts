export class CustomError extends Error {

  error: string

  constructor(error: string) {
    super(error);
    this.error = error
  }
}