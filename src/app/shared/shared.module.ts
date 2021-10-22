import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { NumberToWordsPipe } from './core/pipe/number-to-words/number-to-words.pipe';


@NgModule({
  declarations: [
    DatatableComponent,
    NumberToWordsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatatableComponent,
    NumberToWordsPipe
  ]
})
export class SharedModule { }
