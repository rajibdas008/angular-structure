import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const dateArr = value.split('T');
    const fullDateArr = dateArr[0].split('-');
    return `${fullDateArr[2]}/${fullDateArr[1]}/${fullDateArr[0]}`;
  }

}
