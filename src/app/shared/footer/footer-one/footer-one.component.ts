import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {

    

  }

  subscribeNewsletter() {

    if ( this.forma.invalid ) {
      swal.fire('Error', 'El correo es obligatorio', 'error');
      return;
    }

    swal.fire('Exito', 'Gracias por subscribirse a nuestras noticias', 'success');
    return;

  }

}
