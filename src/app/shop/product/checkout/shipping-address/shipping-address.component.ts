import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  
  // form group
  public checkoutForm   :  FormGroup;
  public addressPrincipal : boolean = true;
  public state = 'CIUDAD DE MEXICO';
  public user;


  // Form Validator
  constructor(private fb: FormBuilder, 
    public userService: UserService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      nameTdc: ['', Validators.required],
      idTdc: ['', Validators.required],
      nroTdc: ['', Validators.required],
      dateTdc: ['', Validators.required],
      ccvTdc: ['', Validators.required]
    })
  }

  ngOnInit() {

    this.userService.getUser().subscribe( user => {
      console.log(user.json());
      this.user = user.json();
    });

  }

}
