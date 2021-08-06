import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenpanelComponent } from './tokenpanel.component';

const routes: Routes = [{ path: '', component: TokenpanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenpanelRoutingModule { }
