import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

    public title: 'app';
    public columnDefs: any = [
      {
        headerName: 'Start Time',
        field: 'startTimeLocal',
        checkboxSelection: true,
        width: 240
      },
      {
        headerName: 'Activity Type',
        field: 'activityType.typeKey'
      },
      {
        headerName: 'Activity Name',
        field: 'activityName'
      },
      {
        headerName: 'Distance',
        field: 'distance',
        width: 120,
        valueGetter: this.convertMetersToMiles
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 400
      },

    ];
    public rowData: any;

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.rowData = this.http.get('https://api.myjson.com/bins/b5qg4');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation =
      selectedData.map( node =>
        node.startTimeLocal + ' ' +
        this.convertMetersToMilesView(node.distance)).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  public convertMetersToMiles(params: any): any {
    return (params.data.distance * 0.00062137).toFixed(2);
  }

  private convertMetersToMilesView(params: any): any {
    return (params * 0.00062137).toFixed(2);
  }
}
