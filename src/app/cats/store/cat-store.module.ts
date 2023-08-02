import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CatState } from './cat.state';

@NgModule({
  imports: [NgxsModule.forFeature([CatState])],
})
export class CatStoreModule {}
