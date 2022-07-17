import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  user: any;
  editPasswordEnabled = false;
  editBirthdayEnabled = false;
  editGenderEnabled = false;
  editPhoneEnabled = false;

  constructor(
    public userService: UserService,
    private fb: FormBuilder
  ) {
    console.log(this.userService.user);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      birthday: [''],
      phone: ['', [Validators.pattern('[0-9]+')]],
      gender: ['', [Validators.required]],
    });
  }

  updateAccount(item) {
    const data = this.form.value;
    this.userService.updateUser(data).subscribe( (user) => {
      console.log(user);

      setTimeout(() => {
        switch (item) {
          case 'password':
            this.editPasswordEnabled = false;
            break;
          case 'birthday':
            this.editBirthdayEnabled = false;
            break;
          case 'gender':
            this.editGenderEnabled = false;
            break;
          case 'phone':
            this.editPhoneEnabled = false;
            break;
          default:
            break;
        }
      });
    });
  }

  editItem(item: string) {
    switch (item) {
      case 'password':
        this.editPasswordEnabled = true;
        break;
      case 'birthday':
        this.editBirthdayEnabled = true;
        break;
      case 'gender':
        this.editGenderEnabled = true;
        break;
      case 'phone':
        this.editPhoneEnabled = true;
        break;
      default:
        break;
    }
  }

}
