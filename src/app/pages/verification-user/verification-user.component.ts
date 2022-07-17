import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-verification-user',
  templateUrl: './verification-user.component.html',
  styleUrls: ['./verification-user.component.scss']
})
export class VerificationUserComponent implements OnInit {

  public verified: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) {

    console.log('verification user');

    this.route.params.subscribe(params => {
      const token = params['token'];
      this.verificationUser(token);
    });
  }

  ngOnInit() {
  }

  verificationUser(token: string) {

    this.userService.verifyUser( token )
              .subscribe( resp => {
                this.verified = resp.ok;
               });

  }

}
