import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { URL_SERVICES } from '../../config/config';
import { UserService } from './user.service';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("wishlistItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  [x: string]: any;
  
  // wishlist array
  public wishlistProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer:  Subscriber<{}>;

  // Initialize 
  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.wishlistProducts.subscribe(products => products = products);
  }

  // Get  wishlist Products
  public getProducts() {

    const user = this.userService.user.id;
    let url = URL_SERVICES + 'getFavorites/' + user;
    url += '?token=' + this.userService.token;

    return this.http.get( url ).map( (resp:any) => {
      return resp;
    });
    // const itemsStream = new Observable(observer => {
    //   observer.next(products);
    //   observer.complete();
    // });
    // return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In wishlist
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to wishlist
  public addToWishlist(favorite) {

    let url = URL_SERVICES + 'updateFavorites';
    url += '?token=' + this.userService.token;

    return this.http.post( url, favorite )
                    .pipe(map( (resp: any) => {
                      if( resp === 'add' ) {
                      this.toastrService.success('Este producto se agrego a la lista de favoritos.'); // toasr services
                      }else {
                        this.toastrService.success('Este producto se ha eliminado de la lista de favoritos.'); // toasr services
                      }
                      return resp;
                    }))
                    .catch( err => {
                      return throwError( err );
                    });
    // let item: Product | boolean = false;
    // if (this.hasProduct(product)) {
    //   item = products.filter(item => item.id === product.id)[0];
    //   const index = products.indexOf(item);
    // } else {
    //   products.push(product);
    // }
    //   this.toastrService.success('Este producto se agrego a la lista de favoritos.'); // toasr services
    //   localStorage.setItem("wishlistItem", JSON.stringify(products));
    //   return item;
  }

  // Removed Product
  public removeFromWishlist(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("wishlistItem", JSON.stringify(products));
  }
  

}
