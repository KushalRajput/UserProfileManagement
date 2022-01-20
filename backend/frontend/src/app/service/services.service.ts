import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  headerString = new BehaviorSubject<String>('');  //  '' is the initial value.
  userDetails = new BehaviorSubject<Object>(undefined);

  toaster(type, msg, time = 1500) {
    switch (type) {
      case "success":
        this.toastr.success(msg, "SUCCESS", { timeOut: time });
        break;
      case "info":
        this.toastr.info(msg, "INFORMATION", { timeOut: time });
        break;
      case "error":
        this.toastr.error(msg, "ERROR", { timeOut: time });
        break;
      case "warn":
        this.toastr.warning(msg, "WARNING", { timeOut: time });
        break;
      case "update":
        this.toastr.success("msg", "UPDATE", { timeOut: time });
      default:
        this.toastr.success(msg, "SUCCESS", { timeOut: time });
        break;
    }
  }

  PostReq(name, body) {
    return this.http.post(`${environment.url}/${name}`, body);
  }

  GetReq(name) {
    return this.http.get(`${environment.url}/${name}`);
  }
}

