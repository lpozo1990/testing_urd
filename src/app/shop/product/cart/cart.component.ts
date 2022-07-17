import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { CartItem } from '../../../shared/classes/cart-item';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { URL_SERVICES_IMG } from '../../../config/config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems          :   Observable<CartItem[]> = of([]);
  public shoppingCartItems  :   CartItem[] = [];
  public url = URL_SERVICES_IMG;

  constructor(
    private productsService: ProductsService,
    public cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  	this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }
 
  // Increase Product Quantity
  public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
  
  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
  
  // Get Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }
  
  // Remove cart items
  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  checkout() {

    const users = [];

    this.shoppingCartItems.map( (shoppingsCart: any) => {

      const include = users.indexOf(shoppingsCart.product.user);
      if( include < 0 ) {
        users.push(shoppingsCart.product.user);
      }
    });

    if( users.length > 1 ){
      this.toastrService.error('Debe seleccionar productos de un mismo rentador');
      this.router.navigate(['/home/cart']);
    } else {
      this.router.navigate(['/home/checkout']);
    }
  }

}
