import { ResHttpError } from '../constants/res-http-error';

declare module 'koa' {
  interface BaseContext {
    ResHttpError: typeof ResHttpError;
  }

  interface BaseContext {
    success: (data: any, message?: string) => void;
  }
}
  