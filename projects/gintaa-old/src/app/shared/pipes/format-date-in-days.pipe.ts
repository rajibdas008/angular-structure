import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'formatDateInDays'
})
export class FormatDateInDays implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const dateArr = value.split('T');
    return this.expiryDate(dateArr[0]);
  }

  expiryDate(date_string) {
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var days = moment(expiration).diff(current_date, 'days');
    return days;
  }

}
