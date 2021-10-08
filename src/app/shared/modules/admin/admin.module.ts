import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { RbacComponent } from './rbac/rbac.component';


@NgModule({
  declarations: [
    UserComponent,
    RbacComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
