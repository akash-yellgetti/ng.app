import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Output() instance = new EventEmitter<string>();
  @Input() options: any = {};
  @Input() id: any;
  @Input() refresh: any;
  constructor() {
    this.id = this.id || new Date().getTime();
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    const element = $('#'+this.id);
    const table = element.DataTable(this.options);
    // console.log(this.instance);
    this.instance.emit(table);
    // console.log(table);
  }

}
