import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductsService } from '../../../../shared/services/products.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  public products: Product[] = [];
  
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => {
      this.products = product;
      product.map( prod => {

        const pictures = JSON.parse(prod.pictures);

        prod.pictures = 'assets/images/fashion/product/' + pictures[0].name;

      });
   });
  // this.productsService.getProducts().subscribe(product => this.products = product);
  }

}
