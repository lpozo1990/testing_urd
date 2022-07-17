import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {

    this.forma = new FormGroup({
      name: new FormControl( null , Validators.required ),
      lastname: new FormControl( null , Validators.required ),
      email: new FormControl( null , [Validators.required, Validators.email] ),
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required ),
    }, { validators: this.sonIguales( 'password', 'password2' )  } );
  }

  registerUser() {

    if ( this.forma.invalid ) {
      if(this.forma.get('name').hasError('required')) {
        swal.fire('Error', 'El campo nombre es requerido', 'error');
        return;
      }

      if(this.forma.get('lastname').hasError('required')) {
        swal.fire('Error', 'El campo apellidos es requerido', 'error');
        return;
      }

      if(this.forma.get('email').hasError('required')) {
        swal.fire('Error', 'El campo email es requerido', 'error');
        return;
      }

      return;
    }

    // if ( !this.forma.value.condiciones ) {
    //   swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
    //   return;
    // }


    const user = new User(
      this.forma.value.name,
      this.forma.value.lastname,
      this.forma.value.email,
      this.forma.value.password
    );

    this.userService.createUser( user )
              .subscribe( resp => {
                swal.fire('Usuario creado', 'El usuario se ha creado exitosamente, debe confirmar la misma antes de poder ingresar', 'success');
                // this.router.navigate(['/pages/login']);
                this.login();
               }, (error: any) => {
                  swal.fire('Error', 'Ocurrio un error creando el usuario', 'error');
              });

  }

  login() {

    const user = new User(null, null, this.forma.value.email, this.forma.value.password);

    this.userService.login( user )
              .subscribe( (resp: any) => {
                this.forma.reset();
                this.router.navigate(['/cuenta/dashboard']);
              }, (error: any) => {

              });

  }

}
