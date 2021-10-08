import { Component, OnInit } from '@angular/core';
import { Market } from '../../core/json/market';
import { MarketService } from '../../core/services/api/market/market.service';
import * as _ from 'lodash';
declare const $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  index: any = Market.index;
  constructor(private marketService: MarketService) { 
    this.index.listDatatable.id = new Date().getTime()+"_"+this.index.listDatatable.id;
  }

  ngOnInit(): void {
  }

  listDatatableEvt = ($event: any) => {
    const table = $event;
    this.index.listDatatable.table = table;
    const self = this;
    const elem: any = $('#'+this.index.listDatatable.id).on('click', 'tbody tr', function() {
      const row = table.row($(this)).data();
      self.selectedRow(row);
    });
  }

  otmCallDatatableEvt = ($event: any) => {
    const table = $event;
    this.index.otmCallDatatable.table = table;
  }

  otmPutDatatableEvt = ($event: any) => {
    const table = $event;
    this.index.otmPutDatatable.table = table;
  }

  itmCallDatatableEvt = ($event: any) => {
    const table = $event;
    this.index.itmCallDatatable.table = table;
  }

  itmPutDatatableEvt = ($event: any) => {
    const table = $event;
    this.index.itmPutDatatable.table = table;
  }

  selectedRow = (row: any) => {
    console.log(row);
    this.marketService.indexInfo(row.detailId).subscribe(async (res) => {
      const data = res.data;
      console.log(data);
      this.index.info = data;
      const expiryDate = '2021-10-14';
      // const callOptions = await this.marketService.furtureOptions(row.id, 'CE', expiryDate).toPromise();
      // const putOptions = await this.marketService.furtureOptions(row.id, 'CE', expiryDate).toPromise();
      // console.log(callOptions);
      // console.log(putOptions);
      const promises = [
        this.marketService.furtureOptions(row.id, 'CE', expiryDate).toPromise(),
        this.marketService.furtureOptions(row.id, 'PE', expiryDate).toPromise(),
      ];

      const strikeprice = row.id == 23 ? 37800 : 17900;

      Promise.all(promises).then((resp) => {
        // console.log(resp);
        const callOptions = _.get(resp[0], 'fno_list.item');
        const putOptions = _.get(resp[1], 'fno_list.item');
        const otmCall = _.chain(callOptions).filter((r) => {
          return strikeprice < parseInt(r.strikeprice);
        }).take(10).value();
        this.resetDatableData(this.index.otmCallDatatable.table, otmCall);
        console.log('otmCall', otmCall);
        const otmPut = _.chain(putOptions).filter((r) => {
          return strikeprice > parseInt(r.strikeprice);
        }).orderBy(['strikeprice'], ['desc']).take(10).value();
        console.log('otmPut', otmPut);
        this.resetDatableData(this.index.otmPutDatatable.table, otmPut);
        const itmCall = _.chain(callOptions).filter((r) => {
          return strikeprice > parseInt(r.strikeprice);
        }).orderBy(['strikeprice'], ['desc']).take(10).value();
        console.log('itmCall', itmCall);
        this.resetDatableData(this.index.itmCallDatatable.table, itmCall);
        const itmPut = _.chain(putOptions).filter((r) => {
          return strikeprice < parseInt(r.strikeprice);
        }).take(10).value();
        console.log('itmPut', itmPut);
        this.resetDatableData(this.index.itmPutDatatable.table, itmPut);
      })
    })
  }

  resetDatableData =  (datatable: any, data: any) => {
    datatable.clear();
    datatable.rows.add(data);
    datatable.draw();
  }
}
