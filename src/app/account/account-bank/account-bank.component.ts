import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-bank',
  templateUrl: './account-bank.component.html',
  styleUrls: ['./account-bank.component.css']
})
export class AccountBankComponent implements OnInit {
  bank;
  forma: FormGroup;

  constructor(
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    activatedRoute.params.subscribe( params => {

      let id = params['user'];

      this.getBank();

    });
  }

  ngOnInit(): void {
    this.forma =    new FormGroup({
      name:         new FormControl( null, Validators.required ),
      bank:    new FormControl( null, Validators.required ),
      clave:  new FormControl( null, Validators.required ),
      account:  new FormControl( null, Validators.required )
    });
  }

  getBank() {
    this.userService.getBank()
          .subscribe( (resBank: any) => {
            this.bank = resBank.json();
          });
  }

  // Update Bank
  updateBank() {

    if ( this.forma.invalid ) {
      return;
    }

    const bank  = this.forma.value;

    this.userService.updateBank(bank).subscribe( resp => {
      this.toastrService.success('Información actualizada');
    });

  }

}
