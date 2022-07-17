import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { trigger, transition, style, animate } from "@angular/animations";
import { Product, ColorFilter, SizeFilter } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';
import * as _ from 'lodash'
import * as $ from 'jquery';
import { URL_SERVICES_IMG } from '../../../../config/config';
import { retry } from 'rxjs/internal/operators/retry';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss'],
  animations: [  // angular animation
    trigger('Animation', [
      transition('* => fadeOut', [
        style({ opacity: 0.1 }),
        animate(1000, style({ opacity: 0.1 }))
      ]),
      transition('* => fadeIn', [
         style({ opacity: 0.1 }),
         animate(1000, style({ opacity: 0.1 }))
      ])
    ])
  ]
})
export class CollectionLeftSidebarComponent implements OnInit {

  public products     :   Product[] = [];
  public items        :   Product[] = [];
  public allItems     :   Product[] = [];
  public colorFilters :   ColorFilter[] = [];
  public sizesFilters :   any[] = [];
  public sizes        :   any[] = [];
  public colors       :   any[] = [];
  public sortByOrder  :   string = '';   // sorting
  public animation    :   any;   // Animation

  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of data is reached

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productsService: ProductsService
    ) {
       this.route.params.subscribe(params => {
          const category = params['category'];
          const location = params['location'];

          let getProduct = this.productsService.getProductByCategory(category);

          if( location ) {
            getProduct = this.productsService.getProductBySearch(category, location);
          }

          getProduct.pipe(retry(2)).subscribe(products => {
             this.allItems = products;  // all products
             products.map( product => {

                const pictures = JSON.parse(product.pictures);

                product.pictures = URL_SERVICES_IMG + product.id + '/' + product.coverImage;
            });
             this.products = products.slice(0,8);
            //  this.getSizes(products);
             this.getColors(products);
          });
       });
  }

  ngOnInit() {
  }

  // Get current product tags
  public getSizes(products) {
     var uniqueSizes = []
     var itemSize = Array();
     products.map((product, index) => { 
        if(product.size) {
           product.size.map((size) => {
           const index = uniqueSizes.indexOf(size);
           if(index === -1)  uniqueSizes.push(size);
        });
       }
     });
     for (var i = 0; i < uniqueSizes.length; i++) {
          itemSize.push({size:uniqueSizes[i]})
     }
     this.sizes = itemSize
  }
  
  // Get current product colors
  public getColors(products) {
     var uniqueColors = []
     var itemColor = Array();
     products.map((product, index) => {
       if(product.colors) {
       product.colors.map((color) => {
           const index = uniqueColors.indexOf(color.color);
           if(index === -1)  uniqueColors.push(color.color);
       });
      }
     });
     for (var i = 0; i < uniqueColors.length; i++) {
          itemColor.push({color:uniqueColors[i]})
     }
     this.colors = itemColor
  }

  // Animation Effect fadeIn
  public fadeIn() {
      this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
      this.animation = 'fadeOut';
  }

 
  // Initialize filetr Items
  public filterItems(): Product[] {
      return this.items.filter((item: Product) => {
          const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
            const colores = [];
            item.colors.map( (color) => {
              colores.push(color.color);
            });
            if(item.colors) {
              if (colores.includes(curr.color)) {
                return prev && true;
              }
            }
          }, true);
          const Sizes: boolean = this.sizesFilters.reduce((prev, curr) => { // Match sizes
            if(item.sizes) {
              if (item.sizes.includes(curr)) {
                return prev && true;
              }
            }
          }, true);
          return Colors && Sizes; // return true
      });
  }
  
  // Update tags filter
  public updateSizeFilters(sizes: any[]) {
      this.sizesFilters = sizes;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Update color filter
  public updateColorFilters(colors: ColorFilter[]) {
      this.colorFilters = colors;
      this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }
  
  // Update price filter
  public updatePriceFilters(price: any) {
      let items: any[] = [];
      this.products.filter((item: Product) => {
          if (item.price >= price[0] && item.price <= price[1] )  {            
             items.push(item); // push in array
          } 
      });
      this.items = items;
  }

  public twoCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-6");
    }
  }

  public threeCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-4");
    }
  }

  public fourCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-3");
    }
  }

  public sixCol() {
    if ($('.product-wrapper-grid').hasClass("list-view")) {} else {
      $(".product-wrapper-grid").children().children().children().removeClass();
      $(".product-wrapper-grid").children().children().children().addClass("col-lg-2");
    }
  }

  // For mobile filter view
  public mobileFilter() {
    $('.collection-filter').css("left", "-15px");
  }

  // Infinite scroll
  public onScroll() {
      this.lastKey = _.last(this.allItems)['id'];
      if (this.lastKey != _.last(this.items)['id']) {
         this.finished = false
      }   
      // If data is identical, stop making queries
      if (this.lastKey == _.last(this.items)['id']) {
         this.finished = true
      }
      if(this.products.length < this.allItems.length){  
         let len = this.products.length;
         for(var i = len; i < len+4; i++){
           if(this.allItems[i] == undefined) return true
             this.products.push(this.allItems[i]);
         }
      }
  }
  
  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
     this.sortByOrder = val;
     this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

}
