import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './modules/FormBuilder/form/form.component';
import { FieldComponent } from './modules/FormBuilder/field/field.component';
import { BuilderComponent } from './modules/FormBuilder/builder/builder.component';

@NgModule({
  declarations: [
    FormComponent,
    FieldComponent,
    BuilderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
