import { Component, OnInit } from '@angular/core';
import { Market } from '../../core/json/market';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  index: any = Market.index;
  constructor() { 
    this.index.listDatatable.id = new Date().getTime()+"_"+this.index.listDatatable.id;
  }

  ngOnInit(): void {
  }

  listDatatableEvt = ($event: any) => {
    this.index.listDatatable.table = $event;
  }

}
