import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onClick(){
    const x = document.querySelector('#subscribe');
    if (x) {
    x.scrollIntoView();
    }
  }
}
