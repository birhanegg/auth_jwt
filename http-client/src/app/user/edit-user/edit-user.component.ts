import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  pipe = new DatePipe('en-US');
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.apiService.getUserById(userId)
      .subscribe(data => {
        let temp = data.result.birthDate;
        data.result.birthDate = this.pipe.transform(temp, 'yyyy-MM-dd');
        delete data.result.__v;
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
