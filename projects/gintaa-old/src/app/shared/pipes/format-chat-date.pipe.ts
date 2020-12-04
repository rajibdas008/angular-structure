import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatChatDate'
})
export class FormatChatDatePipe implements PipeTransform {

  transform(value: any, isUTC: boolean = true, prefomattedDate = false, ...args: any[]): any {
    // expected format - 2020-08-10T15:37:33.574
    let formattedTime = '';
    const dateArr = value.split('T');
    let fullDate: string = dateArr[0];

    // start formatting
    const formattedDate: any = new Date(value);
    if (prefomattedDate) {
      return `${ value }`;
    }

    const DAY_IN_MS = 86400000;
    const today: any = new Date();
    const yesterday: any = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - formattedDate) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === formattedDate.toDateString();
    const isYesterday = yesterday.toDateString() === formattedDate.toDateString();
    const isThisYear = today.getFullYear() === formattedDate.getFullYear();

    // check times ago
    if (seconds < 5) { return 'now'; }
    if (seconds < 60) { return `${ seconds } seconds ago`; }
    if (seconds < 90) { return 'about a minute ago'; }
    if (minutes < 60) { return `${ minutes } minutes ago`; }

    // check if today/yesterday
    // formattedDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
    if (isToday) { fullDate = 'Today'; }
    if (isYesterday) { fullDate = 'Yesterday'; }

    if (dateArr[1]) {
      if (isUTC) {
        // convert to correct UTC format and send the date
        const UTCDate = new Date(value.substring(0, value.length - 3) + '000Z');
        formattedTime = `${fullDate} ${UTCDate.toLocaleTimeString()}`;
      } else {
        // split by :
        const timeArr = dateArr[1].split(':');
        if (timeArr.length > 0) {
          let timeSeconds = '';
          if (timeArr[2] as string) {
            timeSeconds = timeArr[2].substr(0, 2);
          }
          formattedTime = `${fullDate} ${timeArr[0]}:${timeArr[1]}:${timeSeconds}`;
        }
      }
    } else {
      formattedTime = fullDate;
    }

    return formattedTime;
  }

}
