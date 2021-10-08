import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { EmailComponent } from './email/email.component';


@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule
  ]
})
export class CommunicationModule { }
