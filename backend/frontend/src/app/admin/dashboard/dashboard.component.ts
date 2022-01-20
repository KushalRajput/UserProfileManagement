import { OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  name: string;
  about: string;
  gender: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'about', 'gender', 'strength', 'action'];
  dataSource: MatTableDataSource<UserData>;
  users = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ServicesService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers()
  }

  adduser() {
    this.router.navigateByUrl('/admin/add-user')
  }

  editUser(id) {
    this.router.navigateByUrl(`/admin/add-user/${id}`)
  }

  getAllUsers() {
    this.service.GetReq('admin/getAllUsers').subscribe((data) => {
      this.users = data['response']
      this.users.map((val)=>{
        val['allStrengths'] = []
        if(val['strengths'] && val['strengths'].length > 0){
          val['strengths'].map((data)=>{
            console.log(data['strength']);
            val['allStrengths'].push(data['strength'])
          })
        }
      })
      console.log(this.users);
      
      this.dataSource = new MatTableDataSource(this.users);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
    })
  }

  deleteUser(user_id, index) {
    this.service.PostReq('admin/deleteUser', { user_id }).subscribe((data) => {
      if (data['status_code'] == 200) {
        this.service.toaster('success', data['message'])
        this.users.splice(index, 1)
        this.dataSource = new MatTableDataSource(this.users);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
      }
    }, err => {
      this.service.toaster('error', err.error.message)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout() {
    this.service.toaster('success', 'Successfully Logged Out !!')
    localStorage.setItem('demoUser', null)
    this.router.navigateByUrl('/')
  }
}



