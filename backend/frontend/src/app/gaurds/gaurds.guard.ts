import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../service/services.service';

@Injectable({
  providedIn: 'root'
})

export class GaurdsGuard implements CanActivate {
  constructor(private router: Router, private service: ServicesService) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let value = await this.checking()
    if (value) return true
    else {
      alert('You Are Not Allowed To Access This Page..')
      this.router.navigateByUrl('/')
      return false
    }
  }

  verifyUser(token) {
    return new Promise((resolve, reject) => {
      this.service.PostReq('admin/verifyUser', { access_token: token }).subscribe((data) => {
        if (data['status_code'] == 200) {
          resolve(data['response'])
        }
        else {
          resolve(false)
        }
      })
    })
  }

  checking() {
    return new Promise(async (resolve, reject) => {
      this.service.headerString.subscribe(async (data) => {

        if (data == '/') return false
        let token = (localStorage.getItem('demoUser'));
        if (token && token != 'null') {
          let userSigned = await this.verifyUser(token)
          if (userSigned) {
            this.service.userDetails.next(userSigned)

            if (userSigned['admin'] == 1 && data.includes('/admin')) resolve(true)
            else if (userSigned['admin'] == 0 && data.includes('/user')) resolve(true)
            else resolve(false)
          }
          else resolve(false)
        }
        else {
          if (data.includes('signup')) return true
          else {
            resolve(false)
          }
        }
      })
    })

  }

}
