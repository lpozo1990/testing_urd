import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateReturn'
})
export class DateReturnPipe implements PipeTransform {

  transform( date: string ): any {

    const pipe = new DatePipe('en-US');
    const fecha = new Date(date);

    fecha.setDate(fecha.getDate() + 5);

    return pipe.transform(fecha, 'yyyy-MM-dd');
  }

}
