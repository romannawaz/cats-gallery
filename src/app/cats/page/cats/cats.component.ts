import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { LoaderComponent } from '@app/core/components/loader/loader.component';
import { CatFacade } from '@app/cats/store/cat.facade';

const Material = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
];

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...Material,
    CarouselModule,
    LoaderComponent,
  ],
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent implements OnInit {
  isLoaded$ = this.catFacade.loaded$;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 1,
    nav: true,
    center: true,
  };

  breeds: FormControl = this.fb.control('');
  limit = 10;

  isLoading: boolean = false;

  cats$ = this.catFacade.catsByBreed(this.breeds.value, this.limit);
  breeds$ = this.catFacade.breeds$;

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly catFacade: CatFacade
  ) {}

  ngOnInit(): void {
    this.breeds.valueChanges.subscribe((breedId) => {
      this.catFacade.loadByBreed(breedId, this.limit);
      this.cats$ = this.catFacade.catsByBreed(breedId, this.limit);
    });
  }

  increase(): void {
    this.isLoading = true;

    this.catFacade.loadByBreed(this.breeds.value, 1);
    this.cats$ = this.catFacade.catsByBreed(this.breeds.value, this.limit + 1);

    this.catFacade.loadByBreedSuccess$.pipe(first()).subscribe(() => {
      this.isLoading = false;

      this.limit += 1;
    });
  }

  decrease(): void {
    this.limit -= 1;

    this.cats$ = this.catFacade.catsByBreed(this.breeds.value, this.limit);
  }

  styleImport(url: string) {
    return `url(${url})`;
  }
}
