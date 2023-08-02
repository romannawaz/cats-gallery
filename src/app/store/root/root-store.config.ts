import {
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

export const rootStoreDevConfig: Array<Provider | EnvironmentProviders> = [
  importProvidersFrom(
    NgxsModule.forRoot([], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ),
];
