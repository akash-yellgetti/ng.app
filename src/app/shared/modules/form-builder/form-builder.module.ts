import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormComponent } from './form/form.component';
import { FieldComponent } from './field/field.component';
import { BuilderComponent } from './builder/builder.component';


@NgModule({
  declarations: [
    FormComponent,
    FieldComponent,
    BuilderComponent
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule
  ]
})
export class FormBuilderModule { }
