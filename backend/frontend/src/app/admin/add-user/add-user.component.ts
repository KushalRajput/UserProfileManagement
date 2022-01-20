import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUser: FormGroup;
  submitted: boolean = false
  id: string
  showpass: boolean = false
  buttonName:string = 'Submit'
  constructor(private router: Router, private service: ServicesService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.addUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      gender: '',
      about: '',
      password: ['', Validators.required],
      strengths: this.fb.array([
        this.addnewBlock()
      ])
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id
    if (this.id) {
      this.buttonName = 'Update'
      this.getAndPatchDetails()
    }
  }

  addnewBlock() {    
    return this.fb.group({
      'strength': ''
    });
  }

  addBlock() {
    this.submitted = false
    const control = <FormArray>this.addUser.controls['strengths'];
    control.push(this.addnewBlock());
  }


  get f() { return this.addUser.controls; }

  back() {
    this.router.navigateByUrl('/admin')
  }

  getAndPatchDetails() {
    this.service.PostReq('admin/getUserById', { user_id: this.id }).subscribe((data) => {
      if (data['response']['strengths'].length > 1) {
        for (let index = 0; index < data['response']['strengths'].length - 1; index++) {
          this.addBlock()
        }
      }
      this.addUser.patchValue(data['response'])
    })
  }

  get strengths(): FormArray {
    return this.addUser.get("strengths") as FormArray
  }

  submit() {
    this.submitted = true
    if (this.addUser.invalid) {
      return;
    }
    this.saveDetails(this.addUser.value)
  }

  removeStrength(index) {
    let control = <FormArray>this.addUser.controls['strengths'];
    if (control.value.length > 1) control.removeAt(index);
  }

  shownewPass() {
    let x = document.getElementById('password')
    if (this.showpass) {
      x.setAttribute("type", "password"); this.showpass = false
    }
    else {
      x.setAttribute("type", "text"); this.showpass = true
    }
  }

  saveDetails(values) {
    let data = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      about: values.about,
      password: values.password,
      strengths: values.strengths,
      user_id: this.id
    }
    this.service.PostReq('admin/createAndUpdateUser', data).subscribe((data) => {
      if (data['status_code'] == 200) {
        this.service.toaster('success', data['message'])
        this.router.navigateByUrl(`/admin`)
      }
    }, err => {
      this.service.toaster('error', err.error.message)
    })
  }
}
