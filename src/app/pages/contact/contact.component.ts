import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUs } from '../../shared/classes/contact-us.model';
import { MessageService } from '../../shared/services/message.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  // @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;

  forma: FormGroup;

  constructor(
    public _messageService: MessageService
  ) { }

  ngOnInit() {

    // this.addRecaptchaScript();

    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required ),
      lastname: new FormControl( null, Validators.required ),
      phone: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required ),
      message: new FormControl( null, Validators.required ),
    });
  }

  // renderReCaptch() {
  //   window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
  //     'sitekey' : '6LdojegUAAAAAOzgseJKKTkMt95qARjSAjaopXjU',
  //     'callback': (response) => {
  //         console.log(response);
  //     }
  //   });
  // }

  // addRecaptchaScript() {

  //   window['grecaptchaCallback'] = () => {
  //     this.renderReCaptch();
  //   }

  //   (function(d, s, id, obj){
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { obj.renderReCaptch(); return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'recaptcha-jssdk', this));

  // }

  async resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    await this.sendTokenToBackend(captchaResponse); //declaring the token send function with a token parameter
  }
  
  //function to send the token to the node server
  sendTokenToBackend(tok){
    //calling the service and passing the token to the service
    this._messageService.sendToken(tok).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      },
      () => {}
    );
  }

  sendMessage() {

    if ( this.forma.invalid ) {
      return;
    }

    const message = new ContactUs(
      this.forma.value.name,
      this.forma.value.lastname,
      this.forma.value.phone,
      this.forma.value.email,
      this.forma.value.message
    );

    console.log('sadasdasdsadassadsad');

    this._messageService.sendMessageContactUs( message )
              .subscribe( (resp: any) => {
                this.forma.reset();
                swal.fire('Enviado', 'El mensaje se ha enviado correctamente', 'success');
              });


}

}
