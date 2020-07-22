import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      role: ['', Validators.required]
    });

  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      });
  }

}
