import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { CategoriesService } from '../../shared/services/categories.service';
import Swal from 'sweetalert2';
import { UserService } from '../../shared/services/user.service';

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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  seletedValueType   = '';
  seletedValueSleeve = '';
  seletedValueSeason = '';
  seletedValueChance = '';
  imagenSubir: File;
  imagenTemp;
  imageTempArray = [];
  uploadFile: boolean = false;

  fileData: File = null;

  public respuestaImagenEnviada;
  public resultadoCarga;
  public images = [];
  public imgs   = [];
  loadingImage: boolean = false;
  product;

  forma: FormGroup;

  geocoder:any;

  public locations:Localidad = {
    lat: 0,
    lng: 0,
    marker: {
      lat: 0,
      lng: 0,
      draggable: true
    },
    zoom: 5
  };

  public colors: any  = [];
  public sizes: any   = [];
  public types: any   = [];
  public chances: any = [];
  public seasons: any = [];
  public sleeves: any = [];
  public sizeArray    = [];
  public colorArray   = [];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    public productService: ProductsService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {

    activatedRoute.params.subscribe( async params => {

      let id = params['product'];

      await this.getProduct( id );

    });

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });


  }

  ngOnInit(): void {

    this.getTypeDresses();
    this.getChances();
    this.getSeasons();
    this.getSleeves();
    this.getSizes();
    this.getColors();

    this.locations.marker.draggable = true;

    this.forma =    new FormGroup({
      name:         new FormControl( null, Validators.required ),
      type_slug:    new FormControl( null, Validators.required ),
      chance_slug:  new FormControl( null, Validators.required ),
      season_slug:  new FormControl( null, Validators.required ),
      sleeve_slug:  new FormControl( null, Validators.required ),
      price:        new FormControl( null, Validators.required ),
      price_sale:   new FormControl( null, Validators.required ),
      description:  new FormControl( null, Validators.required ),
      street:       new FormControl( null, Validators.required ),
      nro_ext:      new FormControl(),
      nro_int:      new FormControl(),
      colony:       new FormControl( null, Validators.required ),
      municipality: new FormControl( null, Validators.required ),
      state:        new FormControl( null, Validators.required ),
      cod_postal:   new FormControl( null, Validators.required ),
      country:      new FormControl()
    });

  }

  deleteImage(image, idx, product) {

    this.productService.deleteImage( idx, product ).subscribe(
      (response) => {
        Swal.fire('Imagen eliminada', 'La imagen se ha eliminado', 'success');
        if ( this.productService.product.pictures === '[]' ) {
          this.images = [];
        } else {
          product = JSON.parse(response._body);

          const i = this.images.indexOf(image);

          if ( i !== -1 ) {
            this.images = this.images.splice( i, 1 );
          }

        }
      });

  }

  getProduct( product ) {
    this.productService.getProduct( product )
          .subscribe( (producto: any) => {
            console.log(producto);
            this.product = producto;
            this.sizeArray = producto.size;
            this.colorArray = producto.colors;

            this.locations.lat = parseFloat(producto.location.lat);
            this.locations.lng = parseFloat(producto.location.lng);
            this.locations.marker.lat = parseFloat(producto.location.lat);
            this.locations.marker.lng = parseFloat(producto.location.lng);
            this.locations.address_level_1 = producto.location.street;
            this.locations.address_level_2 = producto.location.colony;
            this.locations.address_state = producto.location.state;
            this.locations.address_zip = producto.location.cod_postal;
            this.locations.marker.draggable = true;

            producto.pictures = JSON.parse(producto.pictures);
            producto.pictures.map( prod => {
              this.images.push(prod.name);
            });
          });
  }

  availableUploadFile() {
    this.uploadFile = true;
  }

  selectImage( event ) {

    this.loadingImage = true;
    const archivo = event.target.files[0];

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
  
        this.productService.postFileImagen( formData, token).subscribe();
      }

      elem.value = "";
  }

  // Checkboxs Sizes
  onCheckboxChange(e) {

    if (e.target.checked) {
      console.log(e.target.value);
      this.sizeArray.push(parseInt(e.target.value));
    } else {
      let i: number = 0;
      this.sizeArray.forEach((item) => {
        console.log(item);
        if (item === parseInt(e.target.value)) {
          console.log(item, '-', e.target.value);
          this.sizeArray.splice(i, 1);
          return;
        }
        i++;
      });
    }

  }

  // Checboxs Color
  onCheckboxChangeColor(e) {

    if (e.target.checked) {
      this.colorArray.push(parseInt(e.target.value));
    } else {
      let i: number = 0;
      this.colorArray.forEach((item) => {
        console.log(item);
        if (item === parseInt(e.target.value)) {
          console.log(item, '-', e.target.value);
          this.colorArray.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  // Create Product
  updateProduct(productId) {

    if ( this.forma.invalid ) {
      return;
    }

    this.images.map( (img) => {
      this.imgs.push({
        name: img
      });

    });

    const product  = this.forma.value;
    const images   = this.imgs;
    const sizes    = this.sizeArray;
    const colors   = this.colorArray;
    const location = this.locations;

    this.productService.updateProduct(productId, product, images, sizes, colors, location).subscribe( resp => {
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
      this.sizes = sizes;
      this.sizes.map( (res) => {
        this.sizeArray.map( (size) => {
          if ( size.id === res.id ) {
            res.checked = true;
          }
        });
      });
    });
  }

  // Get Colors
  getColors() {
    this.categoriesService.getColors().subscribe( (colors) => {
      this.colors = colors;
      this.colors.map( (res) => {
        this.colorArray.map( (color) => {
          if ( color.id === res.id ) {
            res.checked = true;
          }
        });
      });
    });

  }

  // Get Sleeves
  getSleeves() {
    this.categoriesService.getSleeves().subscribe( (sleeves) => {
      this.sleeves = sleeves;
    });

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
            this.locations.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.locations.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.locations.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.locations.address_state = results[0].address_components[i].long_name
          }
        }
        if (results[0].geometry.location) {

          this.locations.lat = results[0].geometry.location.lat();
          this.locations.lng = results[0].geometry.location.lng();
          this.locations.marker.lat = results[0].geometry.location.lat();
          this.locations.marker.lng = results[0].geometry.location.lng();
          this.locations.marker.draggable = true;
          this.locations.viewport = results[0].geometry.viewport;

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
        lat: this.locations.marker.lat,
        lng: this.locations.marker.lng
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
        this.locations.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.locations.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.locations.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.locations.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.locations.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.locations.address_zip = element['long_name'];
        continue;
      }
    }
  }
  
  updateOnMap(e) {

    console.log(e);

    e.preventDefault();

    let full_address:string = this.locations.address_level_1 || ""
    if (this.locations.address_level_2) full_address = full_address + " " + this.locations.address_level_2
    if (this.locations.address_state) full_address = full_address + " " + this.locations.address_state
    if (this.locations.address_country) full_address = full_address + " " + this.locations.address_country

    console.log(full_address);
    this.findLocation(full_address);
  }
  
  
  
  markerDragEnd(m: any) {
   this.locations.marker.lat = m.coords.lat;
   this.locations.marker.lng = m.coords.lng;
   this.findAddressByCoordinates();
  }

}
