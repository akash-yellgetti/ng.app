import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { IndexComponent } from './components/index/index.component';
import { StockComponent } from './components/stock/stock.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
