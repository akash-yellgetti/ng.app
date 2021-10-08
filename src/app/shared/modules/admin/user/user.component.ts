import { Component, OnInit } from '@angular/core';
import { IndexDashboard } from 'src/app/shared/core/json/dashboard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  dashboard: any = IndexDashboard;
  constructor() { }

  ngOnInit(): void {
  }

  intradayDatatableEvt = ($event: any) => {
    this.dashboard.intradayDatatable.table = $event;
  }

}
