/**
 * Created by rvendrasco on 30/11/2016.
 */
import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment/moment';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {
  transform(value: any, args: any[]): any {

    if (args && value) {
      const date = (typeof value === 'string') ? new Date(value) : value;
      if (args[0] === 'local') {
        return date.toLocaleString();
      } else if (args[0] === 'formInput') {
        return moment(date).format('YYYY-MM-DD');
      } else if (args[0] === 'EuropeanDateShort') {
        return moment(date).format('DD/MM/YYYY');
      } else if (args[0] === 'EuropeanWithTime') {
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
      } else if (args[0] === 'hoursMins') {
        return moment(date).format('HH:mm');
      } else if (date) {
        return date;
      }
    }
    return value;
  }
}
