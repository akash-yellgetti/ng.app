import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';


@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatatableComponent
  ]
})
export class SharedModule { }
