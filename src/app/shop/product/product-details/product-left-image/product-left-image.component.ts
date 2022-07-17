import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';


import swal from 'sweetalert2';
import { UserService } from '../../../../shared/services/user.service';
import { Favorite } from '../../../../shared/models/favorite.model';
import { ToastrService } from 'ngx-toastr';
import { URL_SERVICES_IMAGES } from '../../../../config/config';

@Component({
  selector: 'app-product-left-image',
  templateUrl: './product-left-image.component.html',
  styleUrls: ['./product-left-image.component.scss']
})
export class ProductLeftImageComponent implements OnInit {

  public product            :   Product = {};
  public products           :   Product[] = [];
  public counter            :   number = 1;
  public selectedSize       :   any = '';
  public selectedColor      :   any = '';
  public screenWidth       
  public slideRightNavConfig
  public images = [];
  public dateRent;

  //Get Product By Id
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productsService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private userService: UserService,
    private toastrService: ToastrService
    ) {

      this.route.params.subscribe(params => {
        const slug = params['slug'];
        this.images = [];
        this.productsService.getProduct(slug).subscribe( (product: any) => {
          this.product = product;
          this.selectedSize = product.size[0].name;
          this.selectedColor = product.colors[0].name;
          product.pictures = JSON.parse(product.pictures);
          product.pictures.map( prod => {
            this.images.push(URL_SERVICES_IMAGES + 'products/' + product.id + '/' + prod.name);
          });
        });

        this.onResize();
        
      });
  }

  ngOnInit() {

    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      products.map( prod => {
        const pictures = JSON.parse(prod.pictures);
        prod.pictures = 'assets/images/fashion/product/' + pictures[0].name;
      });
    });
    
  }

  submitDateRent(event) {
    this.dateRent = event.target.value;
  }

  // product zoom
  onMouseOver(): void {
    document.getElementById("p-zoom").classList.add('product-zoom');
  }

  onMouseOut(): void {
    document.getElementById("p-zoom").classList.remove('product-zoom');
  }

  public slideRightConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-right-nav'
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
      this.screenWidth = window.innerWidth;
      console.log(this.screenWidth);
      if (this.screenWidth > 576) {
         return this.slideRightNavConfig = { 
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-right-slick',
            arrows: false,
            infinite: true,
            dots: false,
            centerMode: false,
            focusOnSelect: true
        }
     } else {
        return this.slideRightNavConfig = { 
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-right-slick',
            arrows: false,
            infinite: true,
            centerMode: false,
            dots: false,
            focusOnSelect: true,
            responsive: [
                  {
                      breakpoint: 576,
                      settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1
                      }
                  }
            ]
        }
     }
  }

  public increment() { 
      this.counter += 1;
  }

  public decrement() {
      if(this.counter >1){
          this.counter -= 1;
      }
  }


  // Add to cart
  public addToCart(product: Product, quantity) {

    if (quantity == 0) return false;

    if ( this.selectedColor == '' ) {
      this.toastrService.error('Debe seleccionar un color');
      return false;
    }

    if ( this.selectedSize == '' ) {
      this.toastrService.error('Debe seleccionar una talla');
      return false;
    }

    if( !this.dateRent ) {
      this.toastrService.error('Debe seleccionar una fecha de renta');
      return false;
    }

    this.product.talla  = this.selectedSize;
    this.product.color  = this.selectedColor;
    this.product.dateRent = this.dateRent;

    this.cartService.addToCart(product, parseInt(quantity));
  }

  // Add to cart
  public buyNow(product: Product, quantity) {
     if (quantity > 0) 
       this.cartService.addToCart(product,parseInt(quantity));
       this.router.navigate(['/home/checkout']);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {

    const favorite = new Favorite(
      this.userService.user.id,
      product.id
    );

    this.wishlistService.addToWishlist(favorite).subscribe();
  }

  // Change size variant
  public changeSizeVariant(variant) {
     this.selectedSize = variant;
  }

  // Change color variant
  public changeColorVariant(variant) {
     this.selectedColor = variant;
  }

}
