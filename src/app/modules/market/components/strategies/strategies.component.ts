import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss']
})
export class StrategiesComponent implements OnInit {
  strategies: any = {
    stock: {
      price: 1066,
      tradeQty: 4,
      stopLosses: [
        {
          maxStoplossPercent: 2,
          maxStoplossAmount: 2000,
          lossPercent: 0.25,
          lossAmount: 2,
          profitPercent: 0.5,
          profitAmount: 3,
          qty: 0
        },
        // {
        //   lossPercent: 8,
        //   lossAmount: 0,
        //   profitPercent: 15,
        //   profitAmount: 5,
        //   qty: 0
        // },
        // {
        //   lossPercent: 5,
        //   lossAmount: 0,
        //   profitPercent: 15,
        //   profitAmount: 5,
        //   qty: 0
        // },
        // {
        //   lossPercent: 2,
        //   lossAmount: 0,
        //   profitPercent: 15,
        //   profitAmount: 5,
        //   qty: 0
        // }
      ]
    },
    account: {
      amount: 100000
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  calculate = () => {
    // this.strategies.stock.qty = (this.strategies.account.amount/this.strategies.stock.price).toFixed(0);
    // this.strategies.stock.loss1Amt = this.calculateAmt(this.strategies.account.amount, this.strategies.stock.loss1);
    // this.strategies.stock.loss2Amt = this.calculateAmt(this.strategies.account.amount, this.strategies.stock.loss2);
    // this.strategies.stock.loss3Amt = ;
    const stopLosses = _.map(this.strategies.stock.stopLosses, (r) => {
      // this.strategies.stock.qty = (this.strategies.account.amount/this.strategies.stock.price).toFixed(0);
      
      _.set(r, 'profitAmount', this.calculateAmt(this.strategies.stock.price, r.profitPercent, 'profit'));
      _.set(r, 'lossAmount', this.calculateAmt(this.strategies.stock.price, r.lossPercent, 'loss'));
      _.set(r, 'qty', (r.maxStoplossAmount/r.lossAmount).toFixed(0))
      

      return r;
    });

  }

  calculateAmt = (price, percent, type) => {
    const num: any = type === 'profit' ? parseFloat(percent)+100 : 100-parseFloat(percent);

    return (parseFloat(price)*(parseFloat(num)/100)).toFixed(2);
  }
}
