import { Cat, CatBreed } from '@app/cats/common/cat.interface';

export class Load {
  static readonly type = '[Cat] Load';

  constructor(
    public readonly breeds: string[] = [''],
    public readonly limit: number = 10
  ) {}
}

export class LoadSuccess {
  static readonly type = '[Cat] Load Success';

  constructor(public readonly cats: Cat[]) {}
}

export class LoadFailure {
  static readonly type = '[Cat] Load Failure';

  constructor(public readonly error: unknown) {}
}

export class LoadBreeds {
  static readonly type = '[Cat] Load Breed';
}

export class LoadBreedsSuccess {
  static readonly type = '[Cat] Load Breeds Success';

  constructor(public readonly breeds: CatBreed[]) {}
}

export class LoadBreedsFailure {
  static readonly type = '[Cat] Load Breeds Failure';

  constructor(public readonly error: unknown) {}
}

export class LoadByBreed {
  static readonly type = '[Cat] Load by breed';

  constructor(
    public readonly breedId: string,
    public readonly limit: number = 10
  ) {}
}

export class LoadByBreedSuccess {
  static readonly type = '[Cat] Load by breed Success';

  constructor(public readonly cats: Cat[]) {}
}

export class LoadByBreedFailure {
  static readonly type = '[Cat] Load by breed Failure';

  constructor(public readonly error: unknown) {}
}
