import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { CartService } from '../shared/services/cart.service';
import { WishlistService } from '../shared/services/wishlist.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { MessagesService } from '../shared/services/messages.service';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ProductsService, CartService, WishlistService]
})
export class MainComponent implements OnInit {

  public url : any; 
  subscribe = true;
  forma: FormGroup;

  constructor(private router: Router, public _messagesService: MessagesService) {
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.url = event.url;

            console.log(this.url.indexOf('orden/'));

            if (this.router.url.indexOf('orden/') >= 0) {

              this._messagesService.chatEnabled = true;
              const split = this.router.url.split('/');
              this._messagesService.getMessages(split[3]);
              this._messagesService.orderId = split[3];

            } else {
              this._messagesService.chatEnabled = false;
            }

            if (this.router.url.indexOf('ver-orden/') >= 0) {

              this._messagesService.client = false;

            } else if(this.router.url.indexOf('mi-orden/') >= 0) {
              this._messagesService.client = true;
            }

            if( 
              this.url === '/home/checkout' || 
              this.url === '/home/cart' || 
              this.url === '/home/checkout/success' ||
              this.url.indexOf('/cuenta/') >= 0 ){
              this.subscribe = false;
            }else{
              this.forma = new FormGroup({
                email:     new FormControl( null, Validators.required ),
              });
              this.subscribe = true;
            }
          }
    });
  }

  ngOnInit() { 
   $.getScript('assets/js/script.js');
  }

  subscribeNewsletter() {

    if ( this.forma.invalid ) {
      swal.fire('Error', 'El correo es obligatorio', 'error');
      return;
    }

    swal.fire('Exito', 'Gracias por subscribirse a nuestras noticias', 'success');
    return;

  }

}
