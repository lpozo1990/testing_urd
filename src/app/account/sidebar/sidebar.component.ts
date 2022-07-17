import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from '../../shared/classes/message.model';
import { MessagesService } from '../../shared/services/messages.service';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

  messages: Message[] = [];
  forma: FormGroup;
  orderId: string;
  interval;
  chatEnabled = false;

  constructor(
    public userService: UserService,
    public _messagesService: MessagesService,
    private _orderService: OrderService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    const split = this.router.url.split('/');

    this.orderId = split[3];

  }

  ngOnInit(): void {

    this.forma = new FormGroup({
      message: new FormControl( null, Validators.required )
    });

    this.getMessages();

    // this.interval = setInterval(() => this.getMessages(), 4000);

    this.scrollToBottom();

  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }

  getMessages() {

    console.log(this.orderId);
    this._messagesService.getMessages(this.orderId);
  }

  sendMessage() {

    if ( this.forma.invalid ) {
      return;
    }

    const order   = this._messagesService.orderId;
    const message = this.forma.value.message;
    const read = 0;
    const user = this.userService.user.id;
    const client = this._messagesService.client;

    console.log( order );
    console.log( message );

    const mensaje = {
      order,
      message,
      read,
      user,
      client
    };

    this._messagesService.sendMessage( mensaje, read )
                        .subscribe( (resp: any) => {
                          this._messagesService.getMessages(this.orderId);
                        });

    this.forma.reset();
  }

}
