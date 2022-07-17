import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forma2: FormGroup;
  email: string;
  loginForm: boolean = true;
  loadingPass: boolean = false;
  messageError: boolean = false
  
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit() {
    this.forma2 = new FormGroup({
      recover_email: new FormControl( null , Validators.required )
    });
  }

  recoverPass() {
    if ( this.forma2.invalid ) {
      console.log('recoverPass');
      return;
    }

    let user = new User(null, null, this.forma2.value.recover_email, null);

    this._userService.recoverPass( user )
                      .subscribe( (resp: any) => {
                        this.loadingPass = false;
                        swal.fire('Enviado', 'Se ha enviado un correo a su bandeja de entrada para restablecer su contraseña', 'success');
                        this.loginForm = true;
                      }, (error: any) => {
                        this.loadingPass = false;
                        this.forma2.reset();
                        this.loginForm = true;
                      });

  }

}
