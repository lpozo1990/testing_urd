import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../../shared/classes/product';
import { ProductsService } from '../../../shared/services/products.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';
import { UserService } from '../../../shared/services/user.service';
import { Favorite } from '../../../shared/models/favorite.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public breadcrumb: boolean = true;
  public product:       Observable<Product[]> = of([]);
  public wishlistItems: Product[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private wishlistService: WishlistService,
    private productsService: ProductsService,
    private cartService: CartService
    ) {

    if( this.router.url === '/cuenta/favoritos') {
      this.breadcrumb = false;
    }

  }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    if ( this.userService.user !== null ) {
      this.product = this.wishlistService.getProducts();
      this.product.subscribe(products => {
        this.wishlistItems = products;

        products.map( product => {

          const pictures = JSON.parse(product.pictures);

          product.pictures = 'assets/images/fashion/product/' + pictures[0].name;
          // product.pictures = JSON.parse(product.pictures);
        });
      });
    }
  }

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1) {
     if (quantity > 0)
      this.cartService.addToCart(product,quantity);
      this.wishlistService.removeFromWishlist(product);
  }
  
  // Remove from wishlist
  public removeItem(product: Product) {
    console.log(product);

    if ( this.userService.user === null ) {
      swal.fire('Error', 'Debe ingresar a su cuenta para agregar propiedades a favoritos', 'error');
      return;
    }

    const favorite = new Favorite(
      this.userService.user.id,
      product.id
    );

    this.wishlistService.addToWishlist( favorite ).subscribe( () => this.getFavorites() );

  }

}
