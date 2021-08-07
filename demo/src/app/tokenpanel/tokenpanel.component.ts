import { Component, OnInit, ViewChild } from '@angular/core';
import {alertsService} from '../_helper';
import { ApiService  } from '../_helper/api-service';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { TokenList,FilterTokenList } from '../_models/common';
declare var $: any;
import * as _ from "lodash";

class DataTablesResponse {
  declare ata: any[];
  declare draw: number;
  declare recordsFiltered: number;
  declare recordsTotal: number;
  declare Data: any[];
}

@Component({
  selector: 'app-tokenpanel',
  templateUrl: './tokenpanel.component.html',
  styleUrls: ['./tokenpanel.component.scss']
})
export class TokenpanelComponent implements OnInit {

  ClientName:string='';
  MobileNo:string='';

  TokenList:TokenList=new TokenList();
  public FilterData: FilterTokenList = new FilterTokenList();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement?: DataTableDirective;

   response:any;
  constructor(private alert:alertsService,
    private ApiService:ApiService) { }

  ngOnInit(): void {
    this.LoadData();
  }

  userRegistration(SignUpData:NgForm){
    let userData=SignUpData.value;
    this.ApiService.CallApiService('GenrateToken',userData).pipe(first()).subscribe(resp => { 
      let response = resp;
      this.response=response.data;
      this.alert.showAlerts(response.message,'success');
      this.Datatable();

    });
  }

  LoadData(){
    this.dtOptions = {
      destroy: true,
      pagingType: 'simple_numbers',
      pageLength: 15,
      serverSide: true,
      processing: true,
      lengthMenu: [15,20,30],
      dom: "<'row'<'col-sm-12'tr>>" +
        "<'row tbl-footer-row align-items-center'<'col-sm-12 col-md-4 pl-2'i><'col-sm-12 col-md-4 text-center'l><'col-sm-12 col-md-4 pr-2'p>>",
      scrollX: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-right" title="Next"></i>',
          previous: '<i class="fa fa-angle-left" title="Privious"></i>',
          first: '<i class="fa fa-angle-double-left" title="First"></i>',
          last: '<i class="fa fa-angle-double-right" title="Last"></i>'
        },
      },
      ordering: false,
      searching: false,
      
      ajax: (dataTablesParameters: any, callback) => {
          this.FilterData.Limit= dataTablesParameters.length;
          this.FilterData.PageNo= (dataTablesParameters.start + dataTablesParameters.length) / dataTablesParameters.length;
        
        this.ApiService.CallApiService('GetTokenList',this.FilterData).pipe(first()).subscribe(
        resp => {
          this.TokenList = resp.data;
          callback({
            recordsTotal: resp.data['PageDetails']['TotalRecord'],
            recordsFiltered: resp.data['PageDetails']['TotalRecord'],
            data: []
          });
          if(this.TokenList.List.length==0){
            $(".dataTables_empty").css("display", "block");
          }else{
            $(".dataTables_empty").css("display", "none");
          }
            
        },
        error => {
          let errors = 'Something is wrong pls try again';
          this.alert.showAlerts(error.error.ZMessage.ErrorMessage , 'error');
        });
      },
    };
  }

  Datatable(){
    this.datatableElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}
