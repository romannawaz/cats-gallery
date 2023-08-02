import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CatApiKeyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        headers: request.headers.set(
          'x-api-key',
          // TODO: move this api key to env
          'live_WL518qayvGLRffKjVNgc1WdOFIlhC6w9QJqx02oL2rXYoyi5EqwRV5NGIryl0VT8'
        ),
      })
    );
  }
}
