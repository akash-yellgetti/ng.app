import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/modules/layout/dashboard/dashboard.component';
import { MainComponent } from './shared/modules/layout/main/main.component';

const routes: Routes = [
    {
      path: '', redirectTo: 'main', pathMatch: 'full'
    },
    {
      path: 'main',
      component: DashboardComponent
      // children: [
      //   {
      //     path: 'admin',
      //     loadChildren: () => import('./shared/modules/admin/admin.module').then(mod => mod.AdminModule)
      //   }
      // ]
    },
    { 
      path: '**', redirectTo: 'main', pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
