import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  sendMessageContactUs( message ) {
    const url = URL_SERVICES + 'contact-us';
    return this.http.post( url, message );
  }

  sendToken(token: string) {
      const url = URL_SERVICES + 'token-validate';
      return this.http.post<any>(url, {recaptcha: token});
  }

}
