import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { LedgerComponent } from './ledger/ledger.component';
import { VoucherComponent } from './voucher/voucher.component';


@NgModule({
  declarations: [
    LedgerComponent,
    VoucherComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
