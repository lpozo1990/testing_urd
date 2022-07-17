import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

// import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(
        public http: HttpClient,
        public router: Router
    ) { }

    getTypeDresses() {

        const url = URL_SERVICES + 'types';
        return this.http.get( url );

    }

    getChances() {

        const url = URL_SERVICES + 'chances';
        return this.http.get( url );

    }

    getSeasons() {

        const url = URL_SERVICES + 'seasons';
        return this.http.get( url );

    }

    getSizes() {

        const url = URL_SERVICES + 'sizes';
        return this.http.get( url );

    }

    getColors() {

        const url = URL_SERVICES + 'colors';
        return this.http.get( url );

    }

    getSleeves() {

        const url = URL_SERVICES + 'sleeves';
        return this.http.get( url );

    }

}