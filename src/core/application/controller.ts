import { type HttpRequest, type HttpResponse } from '@core/helpers/http';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
