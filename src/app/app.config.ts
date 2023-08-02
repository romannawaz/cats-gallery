import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CatApiKeyInterceptor } from '@app/core/api/interceptors/cat-api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatApiKeyInterceptor,
      multi: true,
    },
  ],
};
