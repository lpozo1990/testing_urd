import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/classes/product';
import { CartItem } from '../../shared/classes/cart-item';
import { ProductsService } from '../../shared/services/products.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

import swal from 'sweetalert2';
import { Favorite } from '../../shared/models/favorite.model';
import { URL_SERVICES_IMG } from '../../config/config';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  
  @Input() product : Product;

  public variantImage  :  any = '';
  public selectedItem  :  any = '';
  public url = URL_SERVICES_IMG;

  constructor(
    private router: Router, 
    public productsService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1) {
    this.cartService.addToCart(product,quantity);
  }

  // Add to compare
  public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {

    if ( this.userService.user === null ) {
      swal.fire('Error', 'Debe ingresar a su cuenta para agregar propiedades a favoritos', 'error');
      return;
    }

    const favorite = new Favorite(
      this.userService.user.id,
      product.id
    );

    this.wishlistService.addToWishlist(favorite).subscribe();
  }
 
 // Change variant images
  public changeVariantImage(image) {
     this.variantImage = image;
     this.selectedItem = image;
  }  

}
