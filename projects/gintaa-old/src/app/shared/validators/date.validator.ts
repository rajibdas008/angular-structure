import { AbstractControl, FormControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidators {
  static dateVaidator(control: FormControl) {
    console.log('inside date validator..');
    if (control && control.value && !moment(control.value, 'dd-MM-yyyy', true).isValid()) {
      console.log('inside date validator..1');
      control.markAsDirty();
      return { dateVaidator: true };
    }
    return null;
  }
}
