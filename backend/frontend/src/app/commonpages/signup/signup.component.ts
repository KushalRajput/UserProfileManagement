import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: boolean = false
  admin: boolean = false
  login: any;
  submitted: boolean = false;
  loggedIn: boolean;
  signUpp: boolean = false
  constructor(private service: ServicesService, private router: Router, private fb: FormBuilder,
    private authService: SocialAuthService) { }

  ngOnInit() {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  get f() { return this.login.controls; }

  submit() {
    this.submitted = true
    if (this.login.invalid) {
      return;
    }
    this.signUp(this.login.value)
  }

  signUp(values) {
    let dataToSend = values
    this.service.PostReq('user/createUser', dataToSend).subscribe((data) => {
      if (data['status_code'] == 200) {
        this.service.toaster('success', data['message'])
        localStorage.setItem('demoUser', (data['response']))
        this.router.navigateByUrl('/user')
      }
    }, err => {
      this.service.toaster('error', err.error.message)
    })
  }


  // signUp(values) {
  //   let dataToSend = values
  //   this.service.PostReq('admin/createAdmin', dataToSend).subscribe((data) => {
  //     if (data['status_code'] == 200) this.router.navigateByUrl('/admin')
  //   })
  // }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.getDetails()
  }

  signInWithFB(): void {
    alert('Sorry but login with facebook requires a https server, which i dont have')
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginButton() {
    this.router.navigateByUrl('/')
  }

  getDetails() {
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        let dataToSend = {
          email: user.email,
          name: user.name
        }
        this.service.PostReq('user/socialSignUp', dataToSend).subscribe((val) => {
          if (val['status_code'] == 200) {
            this.service.toaster('success', val['message'])
            localStorage.setItem('demoUser', (val['response']))
            this.router.navigateByUrl('/user')
          }
        }, err => {
          this.service.toaster('error', err.error.message)
        })
      }
    });
  }
}

