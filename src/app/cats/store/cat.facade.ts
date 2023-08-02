import { Injectable } from '@angular/core';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import { Observable, map } from 'rxjs';

import { CatState } from './cat.state';
import { Cat, CatBreed } from '../common/cat.interface';
import * as CatsActions from './cat.actions';

@Injectable()
export class CatFacade {
  @Select(CatState.loaded)
  loaded$!: Observable<boolean>;

  @Select(CatState.cats)
  cats$!: Observable<Cat[]>;

  @Select(CatState.breeds)
  breeds$!: Observable<CatBreed[]>;

  loadSuccess$: Observable<Cat[]> = this.actions.pipe(
    ofActionDispatched(CatsActions.LoadSuccess),
    map(({ cats }) => cats)
  );

  loadFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(CatsActions.LoadFailure),
    map(({ error }) => error)
  );

  loadBreedsSuccess$: Observable<CatBreed[]> = this.actions.pipe(
    ofActionDispatched(CatsActions.LoadBreedsSuccess),
    map(({ breeds }) => breeds)
  );

  loadBreedsFailure$: Observable<unknown> = this.actions.pipe(
    ofActionDispatched(CatsActions.LoadBreedsFailure),
    map(({ error }) => error)
  );

  constructor(
    private readonly store: Store,
    private readonly actions: Actions
  ) {}

  load(breeds: string[], limit: number): void {
    this.store.dispatch(new CatsActions.Load(breeds, limit));
  }

  loadBreeds(): void {
    this.store.dispatch(new CatsActions.LoadBreeds());
  }
}
