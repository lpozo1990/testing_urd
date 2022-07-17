import { Component, OnInit } from '@angular/core';
import { MENUITEMS, Menu } from './navbar-items';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public menuItems: Menu[];
  public toggleNavBar : boolean = false;
  public active: 'active';

  constructor() { }

  ngOnInit() {
  	this.menuItems = MENUITEMS.filter(menuItem => menuItem);
  }

  toggleNav() {
    this.toggleNavBar = !this.toggleNavBar
  }

}
