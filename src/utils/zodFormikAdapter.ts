import { z } from 'zod';

export class ValidationError extends Error {
  constructor(
    message: string,
    public override name = 'ValidationError',
    public inner: { path: string; message: string }[] = []
  ) {
    super(message);
  }
}

function createValidationError(e: z.ZodError) {
  const error = new ValidationError(e.message);
  error.inner = e.errors.map(err => ({
    message: err.message,
    path: err.path.join('.'),
  }));

  return error;
}

export function toFormikValidationSchema<T>(schema: z.ZodSchema<T>): {
  validate: (obj: T) => Promise<void>;
} {
  return {
    async validate(obj: T) {
      try {
        await schema.parseAsync(obj);
      } catch (err: unknown) {
        throw createValidationError(err as z.ZodError<T>);
      }
    },
  };
}
