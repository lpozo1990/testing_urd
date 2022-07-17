import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CategoriesService } from '../../../../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public loadTypes   = false;
  public loadChance  = false;
  public loadSeason  = false;
  public loadSleeves = false;

  public types: any   = [];
  public chances: any = [];
  public seasons: any = [];
  public sleeves: any = [];

  constructor( private categoriesService: CategoriesService ) { }
  
  // collapse toggle
  ngOnInit() {
    $('.collapse-block-title').on('click', function(e) {
        e.preventDefault;
        var speed = 300;
        var thisItem = $(this).parent(),
          nextLevel = $(this).next('.collection-collapse-block-content');
        if (thisItem.hasClass('open')) {
          thisItem.removeClass('open');
          nextLevel.slideUp(speed);
        } else {
          thisItem.addClass('open');
          nextLevel.slideDown(speed);
        }
    });

    this.getTypeDresses();
    this.getChances();
    this.getSeasons();
    this.getSleeves();
  }

  // For mobile view
  public mobileFilterBack() {
     $('.collection-filter').css("left", "-365px");
  }

  getTypeDresses() {

    this.categoriesService.getTypeDresses().subscribe( (types) => {
      this.types = types;
    });

  }

  getChances() {

    this.categoriesService.getChances().subscribe( (chances) => {
      console.log(chances);
      this.chances = chances;
    });

  }

  getSeasons() {

    this.categoriesService.getSeasons().subscribe( (seasons) => {
      console.log(seasons);
      this.seasons = seasons;
    });

  }

  getSleeves() {

    this.categoriesService.getSleeves().subscribe( (sleeves) => {
      console.log(sleeves);
      this.sleeves = sleeves;
    });

  }

}
