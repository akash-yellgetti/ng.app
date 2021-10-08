import { Component, OnInit } from '@angular/core';
import { Market } from '../../core/json/market';
import { MarketService } from '../../core/services/api/market/market.service';

declare const $: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stock: any = Market.stock;
  constructor(private marketService: MarketService) { 
    this.stock.listDatatable.id = new Date().getTime()+"_"+this.stock.listDatatable.id;
    // this.stock.listDatatable.options.initComplete = this.initComplete;
    // () => {
      // const table: any = this;
      // console.log(table);
      
    // const tableApi: any = table.api();
    // const elem: any = $(this);

    // elem.on( 'click', 'tr', function () {
    //   const $row = $(table).closest('tr');
    //   const data = tableApi.table().row($row).data();
    //   console.log(data);
      
    //   // console.log( table.row( this ).data() );
    // });
    // };
  }

  ngOnInit(): void {
  }

  listDatatableEvt = ($event: any) => {
    const table = $event;
    this.stock.listDatatable.table = table;
    const self = this;
    const elem: any = $('#'+this.stock.listDatatable.id).on('click', 'tbody tr', function() {
      const row = table.row($(this)).data();
      self.selectedRow(row);
    });
  }

  selectedRow = (row: any) => {
    console.log(row);
    this.marketService.info(row.sc_id).subscribe((res) => {
      const data = res.data;
      console.log(data);
      this.stock.info = data;
      
    })
  }

}
