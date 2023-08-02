import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CatApiKeyInterceptor } from '@app/core/api/interceptors/cat-api-key.interceptor';
import { rootStoreDevConfig } from '@app/store/root/root-store.config';
import { CatStoreModule } from '@app/cats/store/cat-store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatApiKeyInterceptor,
      multi: true,
    },
    provideAnimations(),
    rootStoreDevConfig,
    importProvidersFrom(CatStoreModule),
  ],
};
