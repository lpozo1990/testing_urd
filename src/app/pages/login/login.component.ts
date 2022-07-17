import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  email: string;
  loginForm: boolean = true;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      email: new FormControl( null , Validators.required ),
      password: new FormControl( null , Validators.required ),
    });

  }

  back() {
    this.loginForm = true;
  }

  recover() {
    this.loginForm = false;
  }

  login() {

    if ( this.forma.invalid ) {
      return;
    }

    const user = new User(null, null, this.forma.value.email, this.forma.value.password);

    this._userService.login( user )
              .subscribe( (resp: any) => {
                this.router.navigate(['/cuenta/dashboard']);
                this.forma.reset();
              }, (error: any) => {
                swal.fire('Error', 'Correo o contraseña invalida', 'error')
                console.log(error);
              });

  }

}
