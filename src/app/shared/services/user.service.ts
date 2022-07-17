import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { URL_SERVICES } from '../../config/config';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;
  token: string;

  // Initialize 
  constructor(
    private http: Http,
    public router: Router
  ) {
    this.loadStorage();
  }

  // Create user
  createUser( user: User ) {

    const url = URL_SERVICES + 'users';

    return this.http.post( url, user );
  }

  getUser() {

    if( !this.user ) {
      this.router.navigate(['/iniciar-sesion']);
    }
    let url = URL_SERVICES + 'users/' + this.user.id;
    url += '?token=' + this.token;

    return this.http.get( url );
  }

  getBank() {

    if( !this.user ) {
      this.router.navigate(['/iniciar-sesion']);
    }
    let url = URL_SERVICES + 'users/get-bank/' + this.user.id;
    url += '?token=' + this.token;

    return this.http.get( url );
  }

  updateUser(data) {
    const user = this.user.id;

    let url = URL_SERVICES + 'users/' + user;
    url += '?token=' + this.token;

    return this.http.put( url, data )
                    .map( (resp: any) => {
                      const response = resp.json();
                      console.log(response);
                      this.saveStorage( response.id, this.token, response );
                      // this.user = response.user;
                      return response;
                    })
                    .catch( err => {
                      console.log('logiiin error',err);
                      return throwError( err );
                });
  }

  updateBank(data) {
    const user = this.user.id;

    let url = URL_SERVICES + 'users/update-bank-info/' + user;
    url += '?token=' + this.token;

    return this.http.post( url, data );
  }

  // Verified if user login
  isLogin() {

    this.loadStorage();
    return ( this.token.length > 5 ) ? true : false;

  }

  // Load user information in localstorage
  loadStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('user') );
    } else {
      this.token = '';
      this.user = null;
    }

  }

  // login
  login( user ) {

    const url = URL_SERVICES + 'ingresar';

    return this.http.post( url, user )
                .map( (resp: any) => {
                  console.log('logiiin', resp);
                  const response = resp.json();
                  this.saveStorage( response.user.id, response.access_token, response.user );
                  this.user = response.user;
                  return true;
                })
                .catch( err => {
                  console.log('logiiin error',err);
                  // const error = JSON.parse(err._body);
                  // swal.fire('Error', error.error, 'error' );
                  return throwError( err );
                });

  }

  // Logout
  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const url = URL_SERVICES + 'logout';
    this.http.get( url );

    this.router.navigate(['home/one']);
  }

  // Save image profile
  saveImageProfile( formData ) {

    let url = URL_SERVICES + 'users/picture-profile/' + this.user.id;
    url += '?token=' + this.token;

    return this.http.post(url, formData)
      .map( (resp: any) => {
        const response = resp.json();
        this.saveStorage( response.id, this.token, response );
      })
      .catch( err => {
        console.log('Error guardando la imagen');
        // swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
        return throwError( err );
      });

}


  // Save user information in localstorage
  saveStorage( id, token: string, user: User ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('user', JSON.stringify(user) );

    this.token = token;
  }

  verifyUser(token: string) {

    const url = URL_SERVICES + 'verificacion-cuenta/' + token;

    return this.http.get(url);
  }

  recoverPass( user ) {

    const url = URL_SERVICES + 'reset-password';
    // url += '?token=' + this.token;

    return this.http.post( url, user )
                    .map( (resp: any) => {
                    })
                    .catch( err => {

                      swal.fire('Error', 'No se ha podido enviar el correo', 'error' );

                      return throwError( err );
                    });

  }

  resetPassword( formReset ) {

    const url = URL_SERVICES + 'password/reset';

    return this.http.post( url, formReset )
                    .map( (resp: any) => {
                      swal.fire('Exito', 'La contraseña se restauró con exito', 'success' );
                    })
                    .catch( err => {

                      swal.fire('Error', 'No se ha podido restaurar la contraseña', 'error' );

                      return throwError( err );
                    });
  }

}
