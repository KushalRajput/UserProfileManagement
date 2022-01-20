import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  about:any;
  constructor(private authService: SocialAuthService, private router: Router, private service: ServicesService) { }

  ngOnInit() {
    this.service.userDetails.subscribe((data) => {      
      this.user = data['name'];
      this.about = data['about'];
    })
  }

  signOut() {
    this.authService.signOut()
      .then(() => {
        this.service.toaster('success', 'Successfully Logged Out !!')
        this.router.navigateByUrl('/')
        localStorage.setItem('demoUser', null)
      })
      .catch((error) => {
        this.router.navigateByUrl('/')
        localStorage.setItem('demoUser', null)
      })
  }

}
