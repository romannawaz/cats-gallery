import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cat, CatBreed } from '@app/cats/common/cat.interface';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private readonly _baseCatApiUrl = 'https://api.thecatapi.com/v1';

  private readonly _catApiImagesSearch = `${this._baseCatApiUrl}/images/search`;
  private readonly _catBreeds = `${this._baseCatApiUrl}/breeds`;

  constructor(
    // TODO: make apiService - wrapper above HttpClient
    private readonly http: HttpClient
  ) {}

  getCats(breedId: string[] = [], limit: number = 10): Observable<Cat[]> {
    return this.http.get<Cat[]>(this._catApiImagesSearch, {
      params: { breed_ids: breedId.join(','), limit },
    });
  }

  getBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(this._catBreeds);
  }
}
