import { Cat, CatBreed } from '@app/cats/common/cat.interface';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';

import * as CatsActions from './cat.actions';
import { Injectable } from '@angular/core';
import { CatsService } from '../service/cats.service';
import { catchError, map } from 'rxjs';

export interface CatStateModel {
  readonly loaded: boolean;
  readonly ids: string[];
  readonly entities: Record<string, Cat>;
  readonly breeds: CatBreed[];
}

export const initialCatState: CatStateModel = {
  loaded: false,
  ids: [],
  entities: {},
  breeds: [],
};

@State<CatStateModel>({
  name: 'cat',
  defaults: initialCatState,
})
@Injectable()
export class CatState implements NgxsOnInit {
  @Selector()
  static loaded(state: CatStateModel): boolean {
    return state.loaded;
  }

  @Selector()
  static cats(state: CatStateModel): Cat[] {
    return Object.values(state.entities);
  }

  @Selector()
  static breeds(state: CatStateModel): CatBreed[] {
    return state.breeds;
  }

  static catsByBreed(
    breedId: string,
    limit = 10
  ): (state: CatStateModel) => Cat[] {
    return createSelector([CatState], (state: CatStateModel) =>
      !breedId
        ? Object.values(state.entities).slice(0, limit)
        : (Object.values(state.entities)
            .map((cat) => {
              let match = false;

              if (cat.breeds.length === 0) return null;
              match = cat.breeds.some((breed) => breed.id === breedId);

              return match ? cat : null;
            })
            .filter(Boolean)
            .slice(0, limit) as Cat[])
    );
  }

  constructor(private readonly catsService: CatsService) {}

  ngxsOnInit(ctx: StateContext<CatStateModel>): void {
    ctx.dispatch(new CatsActions.LoadBreeds());
    ctx.dispatch(new CatsActions.Load());
  }

  @Action(CatsActions.Load)
  load(ctx: StateContext<CatStateModel>, { breeds, limit }: CatsActions.Load) {
    return this.catsService.getCats(breeds, limit).pipe(
      map((cats) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          loaded: true,
          ids: cats.map((cats) => cats.id),
          entities: cats.reduce(
            (acc, current) => ({ ...acc, [current.id]: current }),
            {}
          ),
        });

        return ctx.dispatch(new CatsActions.LoadSuccess(cats));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new CatsActions.LoadFailure(error))
      )
    );
  }

  @Action(CatsActions.LoadBreeds)
  loadBreeds(ctx: StateContext<CatStateModel>) {
    return this.catsService.getBreeds().pipe(
      map((breeds) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          breeds,
        });

        return ctx.dispatch(new CatsActions.LoadBreedsSuccess(breeds));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new CatsActions.LoadBreedsFailure(error))
      )
    );
  }

  @Action(CatsActions.LoadByBreed)
  loadByBreed(
    ctx: StateContext<CatStateModel>,
    { breedId, limit }: CatsActions.LoadByBreed
  ) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      loaded: false,
    });

    return this.catsService.getCats([breedId], limit).pipe(
      map((cats) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          loaded: true,
          ids: [...state.ids, ...cats.map((cat) => cat.id)],
          entities: {
            ...state.entities,
            ...cats.reduce(
              (acc, current) => ({ ...acc, [current.id]: current }),
              {}
            ),
          },
        });

        return ctx.dispatch(new CatsActions.LoadByBreedSuccess(cats));
      }),
      catchError((error: unknown) =>
        ctx.dispatch(new CatsActions.LoadByBreedFailure(error))
      )
    );
  }
}
