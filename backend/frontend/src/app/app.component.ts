import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ServicesService } from './service/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router, private service: ServicesService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.service.headerString.next(event['url'])
        window.scroll(0, 0)
      }
    })
  }
}

