import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { RbacComponent } from './rbac/rbac.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    UserComponent,
    RbacComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
