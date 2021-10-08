import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbacComponent } from './rbac/rbac.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
  },
  {
    path: 'rbac', component: RbacComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
