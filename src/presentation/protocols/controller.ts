import { HttpResponse } from './http';

export interface Controller<T = any> {
  execute: (request: T) => Promise<HttpResponse>;
}
