import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from '../material-module';
import { AddUserComponent } from './add-user/add-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoMaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AdminModule { }
