import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { StockComponent } from './components/stock/stock.component';
import { StrategiesComponent } from './components/strategies/strategies.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: 'strategies',
    component: StrategiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
