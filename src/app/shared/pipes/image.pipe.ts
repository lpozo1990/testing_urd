import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES_IMAGES } from '../../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, tipo: string = 'user', id): any {

    let url = URL_SERVICES_IMAGES;

    if ( !img ) {
      return url + 'no-foto.jpg';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {

      case 'user':
        url += 'user/' + id + '/' + img;
      break;

      case 'product':
        url += 'products/' + id + '/' + img;
      break;

      case 'config':
        url += 'config/' + img;
      break;

      default:
        url += 'no-foto.jpg';
    }

    return url;
  }

}
