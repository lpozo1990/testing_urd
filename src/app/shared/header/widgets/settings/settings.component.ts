import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../../../shared/classes/cart-item';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductsService } from '../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import { URL_SERVICES_IMG } from '../../../../config/config';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-header-widgets',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() shoppingCartItems  :   CartItem[] = [];

  public show  :   boolean = false;
  public url = URL_SERVICES_IMG;

  constructor(
    private translate: TranslateService,
    private cartService: CartService,
    public productsService: ProductsService,
    public userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) { 
  }

  ngOnInit() {
  }

  public updateCurrency(curr) {
    this.productsService.currency = curr;
  }

  public changeLanguage(lang){
    this.translate.use(lang)
  }

  public openSearch() {
    this.show = true;
  }

  public closeSearch() {
    this.show = false;
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

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
