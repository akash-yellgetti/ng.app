import { Component, OnInit } from '@angular/core';
import { Market } from '../../core/json/market';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stock: any = Market.stock;
  constructor() { 
    this.stock.listDatatable.id = new Date().getTime()+"_"+this.stock.listDatatable.id;
  }

  ngOnInit(): void {
  }

  listDatatableEvt = ($event: any) => {
    this.stock.listDatatable.table = $event;
  }

}
