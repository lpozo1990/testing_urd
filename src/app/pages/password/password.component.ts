import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { FormResetPassword } from '../../shared/classes/reset.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  forma: FormGroup;
  token;

  constructor( 
    public router: Router,
    public route: ActivatedRoute,
    public _userService: UserService,
  ) {
    
    route.queryParams.subscribe( params => {

      const token = params['token'];
      this.token = token;

    });

  }

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
      email: new FormControl( null, Validators.required ),
      password: new FormControl( null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl( null, Validators.required, )
    }, { validators: this.sonIguales( 'password', 'password_confirmation' )  });

  }

  resetPassword() {

    if ( this.forma.invalid ) {
      return;
    }

    const formReset = new FormResetPassword(
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.password_confirmation,
      this.token
    );

    this._userService.resetPassword( formReset )
              .subscribe( (resp: any) => {
                this.router.navigate(['']);
              });

  }

}
