import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
// import {  IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';
import { CartItem } from '../../../shared/classes/cart-item';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import swal from 'sweetalert2';
import { URL_SERVICES_IMG } from '../../../config/config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  // form group
  public checkoutForm   :  FormGroup;
  public checkoutFormBilling   :  FormGroup;
  public cartItems      :  Observable<CartItem[]> = of([]);
  public checkOutItems  :  CartItem[] = [];
  public orderDetails   :  any[] = [];
  public amount         :  number;
  public payPalConfig ? : PayPalConfig;
  public addressPrincipal : boolean = true;
  public state = 'CIUDAD DE MEXICO';
  public user;
  public newBilling = false;
  public applyShipping = false;
  public url = URL_SERVICES_IMG;


  // Form Validator
  constructor(
    private fb: FormBuilder, 
    private cartService: CartService, 
    public productsService: ProductsService, 
    private orderService: OrderService, 
    public userService: UserService,
    public router: Router,
    private toastrService: ToastrService) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      // email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      // country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal: ['', Validators.required],
      nameTdc: ['', Validators.required],
      // idTdc: ['', Validators.required],
      nroTdc: ['', Validators.required],
      dateTdc: ['', Validators.required],
      ccvTdc: ['', Validators.required]
    });
    this.checkoutFormBilling = this.fb.group({
      nameBilling: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastnameBilling: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phoneBilling: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      emailBilling: ['', [Validators.required, Validators.email]],
      addressBilling: ['', [Validators.required, Validators.maxLength(50)]],
      countryBilling: ['', Validators.required],
      cityBilling: ['', Validators.required],
      stateBilling: ['', Validators.required],
      postalBilling: ['', Validators.required]
    })
  }

  ngOnInit() {

    this.userService.getUser().subscribe( user => {
      console.log(user.json());
      this.user = user.json();

      console.log(this.user);

      if ( !this.user.shippingAddress ) {
        this.addressPrincipal = false;
        this.user.shippingAddress = {
          nombre: this.user.name,
          apellido: this.user.lastname,
          phone: '',
          city: '',
          address: '',
          postal: '',
        };
      }
    }, (error) => {
      this.userService.logout();
      this.router.navigate(['/iniciar-sesion']);
    });
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.checkOutItems = products);
    this.getTotal().subscribe(amount => this.amount = amount);
    this.initConfig();
  }
  

  addNewAddress() {
    this.addressPrincipal = false;
    this.checkoutForm.reset();
  }

  applyShippingAddress(event) {
    console.log(event);
    if( event.target.checked ){
      this.applyShipping = true;
      this.newBilling = false;
    }else{
      this.applyShipping = false;
    }
  }

  newBillingAddress() {
    this.checkoutFormBilling.reset();
    this.newBilling = true;
  }

  getAddress() {
    console.log(this.userService.user.billingAddress.id);
    if( this.userService.user.billingAddress.id ) {
      return true;
    } else {
      return false;
    }
  }

  // Get sub Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
 
  // stripe payment gateway
  stripeCheckout() {
      var handler = (<any>window).StripeCheckout.configure({
        key: 'PUBLISHBLE_KEY', // publishble key
        locale: 'auto',
        token: (token: any) => {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          // this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, token.id, this.amount);
        }
      });
      handler.open({
        name: 'Urdress',
        description: 'Tienda de renta de vestidos',
        amount: this.amount * 100
      }) 
  }

  // Paypal payment gateway
  private initConfig(): void {

      this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
        commit: true,
        client: {
          sandbox: 'AT5aJ-OIA04VW4_xuEUMnLfq6FXsFP9gCt0T2T06m0RGQ66cQUcoW3AoZzJT97g-28gRpqBzG43yd-QA', // client Id
        },
        button: {
          label: 'paypal',
          // size:  'small',    // small | medium | large | responsive
          // shape: 'rect',     // pill | rect
          //color: 'blue',   // gold | blue | silver | black
          //tagline: false  
        },
        onPaymentComplete: (data, actions) => {
          // this.orderService.createOrder(this.checkOutItems, this.checkoutForm.value, data.orderID, this.amount);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: (err) => {
          console.log('OnError');
        },
        transactions: [{
          amount: {
            currency: this.productsService.currency,
            total: this.amount
          }
        }]
      });

  }

  createOrder() {

    const addressPrincipal = this.addressPrincipal;
    let formBillingAddress = this.checkoutFormBilling.value;

    if( this.applyShipping ) {
      formBillingAddress = this.checkoutForm.value;
    }

    if( this.checkoutForm.invalid ) {
      this.toastrService.error('Debe ingresar todos los datos de la direccion de envio y tarjeta');
      return;
    }

    console.log(addressPrincipal);

    swal.fire({
      title: 'Atencion',
      text: 'Esta a punto de confirmar su pedido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar'
    }).then((create) => {
      if (create.value) {
        this.orderService.createOrder(this.checkOutItems, this.amount, this.checkoutForm.value, formBillingAddress, addressPrincipal);
      }
    });
  }
}
