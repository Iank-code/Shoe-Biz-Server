export type PasswordCompareInput = {
  password: string;
  encrypted: string;
};

export type ServerResponse<T> = {
  status: number;
  message: string;
  data?: T;
  error?: ServerStreamFileResponseOptionsWithError;
};

export type ValidationError = {
  type: string;
  message?: string;
  details: ValidationErrorDetails[];
};
