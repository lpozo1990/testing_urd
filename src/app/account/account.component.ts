import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any;
  imagenSubir: File;
  imagenTemp: any;
  imageTempArray = [];
  fileData: File = null;

  constructor(
    public userService: UserService
  ) {

    this.user = this.userService.user;

  }

  ngOnInit(): void {
  }

  seleccionImage( event ) {

    const archivo = event.target.files[0];

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

    const elem = event.target;
    if ( elem.files.length > 0 ) {
      const formData = new FormData();
      formData.append('file', archivo);

      const userId = this.userService.user.id;

      this.userService.saveImageProfile( formData ).subscribe(
        (response) => {
         swal.fire('Imagen guardada', 'La imagen de perfil se ha guardado exitosamente', 'success');
        });
    }
    elem.value = "";
  }

}
