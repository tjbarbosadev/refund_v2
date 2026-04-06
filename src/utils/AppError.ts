class AppError {
  constructor(
    public message: string,
    public statusCode: number = 400,
  ) {}
}

export { AppError };
