import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenpanelRoutingModule } from './tokenpanel-routing.module';
import { TokenpanelComponent } from './tokenpanel.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TokenpanelComponent
  ],
  imports: [
    CommonModule,
    TokenpanelRoutingModule,
    FormsModule
  ]
})
export class TokenpanelModule { }
