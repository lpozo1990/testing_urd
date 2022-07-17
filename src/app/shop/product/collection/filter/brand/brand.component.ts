import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSize, SizeFilter } from '../../../../../shared/classes/product';
declare var $: any;

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  
  // Using Input nad Output EventEmitter
  @Input()  sizesFilters : ProductSize[] = [];
  @Output() sizeFilters  : EventEmitter<ProductSize[]> = new EventEmitter<ProductSize[]>();
  
  // Array
  public checkedSizesArray: any[] = [];
  
  constructor() { 
  }

  ngOnInit() {
  	  this.sizeFilters.emit(this.checkedSizesArray);   // Pass value Using emit 
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
  }

  // value checked call this function
  checkedFilter(event){
      let index = this.checkedSizesArray.indexOf(event.target.value);  // checked and unchecked value
       if (event.target.checked)   
           this.checkedSizesArray.push(event.target.value); // push in array cheked value
        else 
           this.checkedSizesArray.splice(index,1);  // removed in array unchecked value           
  }

  

}
