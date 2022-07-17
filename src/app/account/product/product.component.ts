import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { ProductsService } from '../../shared/services/products.service';

import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Product } from '../../shared/classes/product';
import { ToastrService } from 'ngx-toastr';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Localidad {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_nro_ext?: string;
  address_nro_int?: string;
  address_municipality?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  seletedValueType   = '';
  seletedValueSleeve = '';
  seletedValueSeason = '';
  seletedValueChance = '';

  forma: FormGroup;
  geocoder:any;
  public location:Localidad = {
    lat: 0,
    lng: 0,
    marker: {
      lat: 0,
      lng: 0,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap) map: AgmMap;

  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  uploadFile: boolean = false;

  fileData: File = null;

  public respuestaImagenEnviada;
  public resultadoCarga;
  public images = [];
  loadingImage: boolean = false;

  public colors: any  = [];
  public sizes: any   = [];
  public types: any   = [];
  public chances: any = [];
  public seasons: any = [];
  public sleeves: any = [];
  public sizeArray    = [];
  public colorArray   = [];

  constructor(
    public userService: UserService,
    public productsService: ProductsService,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    // private wrapper: GoogleMapsAPIWrapper
  ) {

    this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;
      this.mapsApiLoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
      });

    // this.forma = this.fb.group({
    //   checkArray: this.fb.array([], [Validators.required])
    //   checkArrayColor: this.fb.array([], [Validators.required])
    // });

  }

  ngOnInit(): void {
    this.getTypeDresses();
    this.getChances();
    this.getSeasons();
    this.getSleeves();
    this.getSizes();
    this.getColors();

    this.forma =    new FormGroup({
      name:         new FormControl( null, Validators.required ),
      type_slug:    new FormControl( null, Validators.required ),
      chance_slug:  new FormControl( null, Validators.required ),
      season_slug:  new FormControl( null, Validators.required ),
      sleeve_slug:  new FormControl( null, Validators.required ),
      // size:         new FormControl( null, Validators.required ),
      price:        new FormControl( null, Validators.required ),
      price_sale:   new FormControl( null, Validators.required ),
      // color:        new FormControl( null, Validators.required ),
      description:  new FormControl( null, Validators.required ),
      // street:       new FormControl( null, Validators.required ),
      // nro_ext:      new FormControl(),
      // nro_int:      new FormControl(),
      colony:       new FormControl( null, Validators.required ),
      municipality: new FormControl( null, Validators.required ),
      state:        new FormControl( null, Validators.required ),
      // cod_postal:   new FormControl( null, Validators.required ),
      country:      new FormControl()
    });
  }

  // Checkboxs Sizes
  onCheckboxChange(e) {

    if (e.target.checked) {
      console.log(e.target.value);
      this.sizeArray.push(e.target.value);
    } else {
      let i: number = 0;
      this.sizeArray.forEach((item) => {
        console.log(item);
        if (item === e.target.value) {
          console.log(item, '-', e.target.value);
          this.sizeArray.splice(i, 1);
          return;
        }
        i++;
      });
    }

    console.log(this.sizeArray);
  }

  // Checboxs Color
  onCheckboxChangeColor(e) {

    if (e.target.checked) {
      this.colorArray.push(e.target.value);
    } else {
      let i: number = 0;
      this.colorArray.forEach((item) => {
        console.log(item);
        if (item === e.target.value) {
          console.log(item, '-', e.target.value);
          this.colorArray.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  availableUploadFile() {
    this.uploadFile = true;
  }

  // Create Product
  createProduct() {

    if ( this.forma.invalid ) {
      this.toastrService.error('Faltan campos por rellenar.'); // toasr services
      return;
    }

    const product  = this.forma.value;
    const images   = this.images;
    const sizes    = this.sizeArray;
    const colors   = this.colorArray;
    const location = this.location;

    console.log(this.location);

    this.productsService.createProduct(product, images, sizes, colors, location).subscribe( resp => {
      console.log(resp);
    });

  }

  // Get Type Dresses
  getTypeDresses() {
    this.categoriesService.getTypeDresses().subscribe( (types) => {
      this.types = types;
    });

  }

  // Get Chances
  getChances() {
    this.categoriesService.getChances().subscribe( (chances) => {
      this.chances = chances;
    });

  }

  // Get Seasons
  getSeasons() {
    this.categoriesService.getSeasons().subscribe( (seasons) => {
      this.seasons = seasons;
    });

  }

  // Get Sizes
  getSizes() {
    this.categoriesService.getSizes().subscribe( (sizes) => {
      console.log(sizes);
      this.sizes = sizes;
    });

  }

  // Get Colors
  getColors() {
    this.categoriesService.getColors().subscribe( (colors) => {
      this.colors = colors;
    });

  }

  // Get Sleeves
  getSleeves() {
    this.categoriesService.getSleeves().subscribe( (sleeves) => {
      this.sleeves = sleeves;
    });

  }

  selectImage( event ) {

    console.log(event);

    this.loadingImage = true;
    const archivo = event.target.files[0];

    console.log(archivo);

    const token = this.userService.token;

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      // swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.loadingImage = false;
      this.imagenSubir = null;
      return;
    }

      this.imagenSubir    = archivo;
      const reader        = new FileReader();
      const urlImagenTemp = reader.readAsDataURL( archivo );

      console.log(urlImagenTemp);

      reader.onloadend = () => {
        this.imagenTemp = reader.result;
        this.imageTempArray.push(this.imagenTemp);
      }

      const elem = event.target;
      if ( elem.files.length > 0 ) {
        const formData = new FormData();
        formData.append('file', archivo);

        this.images.push({
          name: archivo.name
        });

        this.loadingImage = false;
  
        // if ( this.productsService.updateMedia === false ) {
  
        this.productsService.postFileImagen( formData, token).subscribe();
  
        // } else {
  
        //   this.productsService.updateFileImagen( formData, token, this.productsService.product.id ).subscribe(
        //     (response) => {
        //      this.imageTempArray.push(this.imagenTemp);
        //      if ( this.productsService.product.imagenes === '' ) {
        //       this.images = '';
        //     } else {
        //       this.images = this.productsService.product.imagenes.split(',');
        //     }
        //      this.loadingImage = false;
        //     });
        // }
      }
      elem.value = "";
  }

  /** FUNCTIONS MAP **/

  findLocation(address) {

    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(status);
      console.log(google.maps.GeocoderStatus.OK);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types
          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }
        if (results[0].geometry.location) {

          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;

        }
  
        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }
  
  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  }
  
  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;
    for(let element of address) {
      if(element.length == 0 && !element['types']) continue
      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  }
  
  updateOnMap(e) {

    console.log(e);

    e.preventDefault();

    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country

    this.findLocation(full_address);
  }
  
  
  
  markerDragEnd(m: any) {
   this.location.marker.lat = m.coords.lat;
   this.location.marker.lng = m.coords.lng;
   this.findAddressByCoordinates();
  }

}
