import { Cat } from '@app/cats/common/cat.interface';
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
}

export const initialCatState: CatStateModel = {
  loaded: false,
  ids: [],
  entities: {},
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

  constructor(private readonly catsService: CatsService) {}

  ngxsOnInit(ctx: StateContext<CatStateModel>): void {
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
}
