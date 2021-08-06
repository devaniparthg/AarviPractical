import { Component, OnInit } from '@angular/core';
import {alertsService} from '../_helper';
import { ApiService  } from '../_helper/api-service';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var $: any;
import * as _ from "lodash";

@Component({
  selector: 'app-tokenpanel',
  templateUrl: './tokenpanel.component.html',
  styleUrls: ['./tokenpanel.component.scss']
})
export class TokenpanelComponent implements OnInit {

  ClientName:string='';
  MobileNo:string='';

   response:any;
  constructor(private alert:alertsService,
    private ApiService:ApiService) { }

  ngOnInit(): void {
  }

  userRegistration(SignUpData:NgForm){
    let userData=SignUpData.value;
    this.ApiService.CallApiService('GenrateToken',userData).pipe(first()).subscribe(resp => { 
      let response = resp;
      this.response=response.data;
      this.alert.showAlerts(response.message,'success')

    });
  }

}
