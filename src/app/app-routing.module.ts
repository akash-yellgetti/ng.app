import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/modules/layout/dashboard/dashboard.component';
import { MainComponent } from './shared/modules/layout/main/main.component';

const routes: Routes = [
    {
      path: '', redirectTo: 'main/dashboard', pathMatch: 'full'
    },
    {
      path: 'main',
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'market',
          loadChildren: () => import('./modules/market/market.module').then(mod => mod.MarketModule)
        },
        {
          path: 'admin',
          loadChildren: () => import('./shared/modules/admin/admin.module').then(mod => mod.AdminModule)
        }
      ]
    },
    { 
      path: '**', redirectTo: 'main/dashboard', pathMatch: 'full'
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
