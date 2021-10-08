import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackerRoutingModule } from './tracker-routing.module';
import { VisitorComponent } from './visitor/visitor.component';


@NgModule({
  declarations: [
    VisitorComponent
  ],
  imports: [
    CommonModule,
    TrackerRoutingModule
  ]
})
export class TrackerModule { }
