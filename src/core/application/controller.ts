import { type HttpRequest, type HttpResponse } from '../helpers/http';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
