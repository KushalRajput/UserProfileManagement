import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPagesRoutingModule } from './commonpages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,CommonPagesRoutingModule,FormsModule, ReactiveFormsModule
  ]
})
export class CommonpagesModule { }
