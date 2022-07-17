import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, of, Subscriber, throwError} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { URL_SERVICES } from '../../config/config';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Get product from Localstorage
const products: any = JSON.parse(localStorage.getItem('compareItem')) || [];

@Injectable()

export class ProductsService {

  public currency: string = '';
  public catalogMode: boolean = false;

  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer:  Subscriber<{}>;

  public product;

  // Initialize
  constructor(
    private http: Http,
    private _http: HttpClient,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router
  ) { 
     this.compareProducts.subscribe(products => products = products);
  }

  // Observable Product Array
  private products(): Observable<Product[]> {
     return this.http.get('assets/data/products.json').map((res: any) => res.json())
  }

  // Delete image
  public deleteImage(image, product) {
    let token = this.userService.token;

    let url = URL_SERVICES + 'delete-image/' + image + '/' + product;
    url += '?token=' + token;

    return this.http.post( url, '' ).map( (resp: any) => this.product = resp );
  }

  // Get Products
  public getProducts(): Observable<Product[]> {
    const url = URL_SERVICES + 'products-api';

    return this._http.get( url ).map( (resp:any) => {
      return resp;
    });
  }

  // Get Products By Id
  public getProduct(id: number) {

    const url = URL_SERVICES + 'products-api/' + id;
    return this.http.get( url )
              .map( (resp: any) => {
                return resp.json();
              });

    // return this.products().pipe(map(items => { return items.find((item: Product) => { return item.id === id; }); }));
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {

    const url = URL_SERVICES + 'products-category/' + category;

    return this._http.get( url ).map( (resp:any) => {
      return resp;
    });

  }

  // Get Products By search
  public getProductBySearch(category: string, location): Observable<Product[]> {

    const url = URL_SERVICES + 'products-category/' + category + '/' + location;

    return this._http.get( url ).map( (resp:any) => {
      return resp;
    });

  }

  // Get Products By category
  public getProductsByUser() {

    const user = this.userService.user.id;

    let url = URL_SERVICES + 'products-by-users/' + user;
    url += '?token=' + this.userService.token;

    return this._http.get( url );

  }

  public getLocation() {

    const url = URL_SERVICES + 'products-location';

    return this._http.get( url );
  }

   /*
      ---------------------------------------------
      ----------  Compare Product  ----------------
      ---------------------------------------------
   */

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
    } else {
      if(products.length < 4)
        products.push(product);
      else 
        this.toastrService.warning('Maximum 4 products are in compare.'); // toasr services
    }
      localStorage.setItem("compareItem", JSON.stringify(products));
      return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(products));
  }


  /*
    ---------------------------------------------
    ----------  Create Product  ----------------
    ---------------------------------------------
  */

  public createProduct(product, images, sizes, colors, location) {

    let url = URL_SERVICES + 'products-api';
    url += '?token=' + this.userService.token;

    const data = product;

    data.images = JSON.stringify(images);
    data.size   = sizes;
    data.color  = colors;
    data.location = location;
    data.user_id  = this.userService.user.id;

    return this.http.post(url, data)
                    .map( (resp: any) => {
                      this.toastrService.success('Producto agregado correctamente.'); // toasr services
                      this.router.navigate(['/cuenta/inventario']);
                       return resp;
                    })
                    .catch( err => {
                      const error = err.json();
                      console.log(error.errors);
                      console.log('Error creando el producto');
                      // swal.fire('Error', error.errors[0], 'error');
                      // swal( err.error.mensaje, err.error.errors.message, 'error' );
                      return throwError( err );
                    });


  }

  /*
    ---------------------------------------------
    ----------  Update Product  ----------------
    ---------------------------------------------
  */

  public updateProduct(productId, product, images, sizes, colors, location) {

    let url = URL_SERVICES + 'products-api/' + productId;
    url += '?token=' + this.userService.token;

    const data = product;

    data.images = JSON.stringify(images);
    data.size   = sizes;
    data.color  = colors;
    data.location = location;
    data.user_id  = this.userService.user.id;

    return this.http.put(url, data)
                    .map( (resp: any) => {
                      console.log(resp);
                       return resp;
                    })
                    .catch( err => {
                      const error = err.json();
                      console.log(error.errors);
                      console.log('Error creando el producto');
                      // swal.fire('Error', error.errors[0], 'error');
                      // swal( err.error.mensaje, err.error.errors.message, 'error' );
                      return throwError( err );
                    });


  }

  // Upload images Product
  public postFileImagen( formData, token: string ) {

    let url = URL_SERVICES + 'product-pictures';
    url += '?token=' + token;

    return this.http.post(url, formData);
  }

  // Activated or Desactivated Product
  public activatedProduct( activated: boolean, product: number ) {

    let url = URL_SERVICES + 'activated-product/' + product ;
    url += '?token=' + this.userService.token;

    const data = {
      activated
    };
    return this.http.post(url, data);
  }

  /*
      ---------------------------------------------
      ----------  Delete Product  ----------------
      ---------------------------------------------
   */

  deleteProduct( product ) {

    const token = this.userService.token;

    let url = URL_SERVICES + 'products-api/' + product;
    url += '?token=' + token;

    return this.http.delete( url );

  }

}