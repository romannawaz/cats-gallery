import { Cat } from '@app/cats/common/cat.interface';

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