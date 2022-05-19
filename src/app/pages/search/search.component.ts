import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinct, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputSearch = new FormControl('');

  //Emite el texto a buscar
  @Output() submitted = new EventEmitter<string>();
  
  constructor() {
    this.onChange();
  }

  ngOnInit(): void {}

  onChange() {
    this.inputSearch.valueChanges
      .pipe(
        map( ( search ) => search.trim() ),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((search: string) => search !== '' ),
        tap((search: string) => this.submitted.emit(search))
        ).subscribe();


    // this.inputSearch.valueChanges
    //   .pipe(
    //     tap((res) => this.submitted.emit(res))
    //     ).subscribe();
  }
}
