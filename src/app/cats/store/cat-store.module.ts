import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CatState } from './cat.state';
import { CatFacade } from './cat.facade';

@NgModule({
  imports: [NgxsModule.forFeature([CatState])],
  providers: [CatFacade],
})
export class CatStoreModule {}
