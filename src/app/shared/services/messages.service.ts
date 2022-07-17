import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { Message } from '../classes/message.model';
import { UserService } from './user.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: Message;
  chatEnabled = false;
  public messages;
  public client;
  public orderId;

  constructor(
    public _userService: UserService,
    public _orderService: OrderService,
    public http: HttpClient
  ) { }

  getMessages(order) {

    const user = this._userService.user.id;

    console.log(order);

    const url = URL_SERVICES + 'chats/' + order;

    return this.http.get( url ).subscribe( (chats) => {
      this.messages = chats;
    });

  }

  getMessagesAdmin( room ) {

    const url = URL_SERVICES + 'show-message/' + room;

    return this.http.get( url );

  }

  // getNotifications() {

  //   let url = URL_SERVICES + 'messages-notifications';

  //   return this.http.get( url );

  // }

  // updateStatusPush( id, status ) 
  // {

  //   const token = this._userService.token;

  //   let url = URL_SERVICES + 'update-push/' + id;
  //   url += '?token=' + this._roomService.token;

  //   return this.http.put( url, status);

  // }

  sendMessage( mensaje, read ) {

    const token = this._userService.token;

    let url = URL_SERVICES + 'chats';
    url += '?token=' + token;

    mensaje.read = read;

    console.log('mensaje',mensaje);

    return this.http.post( url, mensaje )
                    .map( (resp: any) => {
                      this.message = resp;
                      return resp;
                    })
                    .catch( err => {
                      return throwError( err );
                    });

  }

}
