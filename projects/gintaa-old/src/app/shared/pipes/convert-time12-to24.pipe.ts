import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime12To24'
})
export class ConvertTime12To24Pipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const [time, modifier] = value.split(' ');  
    let [hours, minutes] = time.split(':');  
    if (hours === '12') {
      hours = '00';
    }  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }  
    return `${hours}:${minutes}:00`;
  }

}
