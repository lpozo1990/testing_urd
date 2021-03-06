import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("cartItem")) || [];

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  // Array
  public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;
  
  constructor(private toastrService: ToastrService) {
      this.cartItems.subscribe(products => products = products );
  }
  
  // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });

    return <Observable<CartItem[]>>itemsStream;
  }
 
  
  // Add to cart
  public addToCart(product: Product, quantity: number): CartItem | boolean {
    var item: CartItem | boolean = false;
    console.log(products);
    // If Products exist
    let hasItem = products.find((items, index) => {
      if(items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) {
          products[index]['quantity'] = qty;
          this.toastrService.success('Este producto se agrego a la cesta.');
        }
        return true;
      }
    });
    // If Products does not exist (Add New Products)
    if(!hasItem) {
        console.log(products);
        item = { product: product, quantity: quantity };
        products.push(item);
        this.toastrService.success('Este producto se agrego a la cesta.');
    }

    localStorage.setItem("cartItem", JSON.stringify(products));
    return item;
  }
  
  // Update Cart Value
  public updateCartQuantity(product: Product, quantity: number): CartItem | boolean {
    return products.find((items, index) => {
      if(items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock) 
          products[index]['quantity'] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }
  
  // Calculate Product stock Counts
  public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let qty   = product.quantity + quantity;
    let stock = product.product.stock;
    if(stock < qty) {
      this.toastrService.error('No puede agregar m??s elementos de los disponibles. Disponible '+ stock);
      return false
    }
    return true
  }
  
  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false; 
      const index = products.indexOf(item);
      products.splice(index, 1);
      localStorage.setItem("cartItem", JSON.stringify(products));
  }

  public removeAllCart() {

    for (let index = 0; index <= products.length; index++) {
      const element = products[index];
      products.splice(element, 1);
    }
    localStorage.setItem("cartItem", JSON.stringify([]));
  }

  // Total amount 
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: CartItem[]) => {
      return products.reduce((prev, curr: CartItem) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }));
  }


}