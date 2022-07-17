import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  forma: FormGroup;
  seletedValueType = '';
  seletedValueLocation = '';
  public locations: any;

  constructor(
    public router: Router, 
    public productService: ProductsService
  ) { }

  ngOnInit() {

    this.getLocations();

    this.forma = new FormGroup({
      category: new FormControl( null, Validators.required ),
      where: new FormControl( null, Validators.required ),
    });

  }

  // Slick slider config
  public sliderConfig: any = {
    autoplay: true,
    autoplaySpeed: 3000
  };

  searchProducts() {

    const category = this.forma.value.category;
    const location = this.forma.value.where.toLowerCase();

    if ( category === null) {
      swal.fire('', 'Debe seleccionar una categoria', 'warning');
      return;
    }

    if ( location === null) {
      swal.fire('', 'Debe ingresar una ciudad, delegacion o colonia', 'warning');
      return;
    }

    this.router.navigate([`home/productos/${category}/${location}`]);

  }

  getLocations() {

    this.productService.getLocation().subscribe( (result) => {
      console.log(result);
      this.locations = result;
    });
  }

}
