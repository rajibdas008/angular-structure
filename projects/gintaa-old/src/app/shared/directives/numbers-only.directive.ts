import { Directive, ElementRef, HostListener, Input } from '@angular/core';
//import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly],textarea[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  // @HostListener('keypress', ['$event']) onInputChange(event) {
  //   // const initalValue = this._el.nativeElement.value;
  //   // this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  //   // if ( initalValue !== this._el.nativeElement.value) {
  //   //   event.stopPropagation();
  //   // }
  // }

  

    @HostListener('paste', ['$event']) 
    onPaste(event: ClipboardEvent) {
      // Don't allow pasted text that contains non-numerics
      const clipboardData = event.clipboardData || (window as any).clipboardData;
      const pastedText = clipboardData.getData('Text');
      if (pastedText) {
        var regEx = new RegExp('^[0-9]*$');
        if (!regEx.test(pastedText)) {
          event.preventDefault();
        } 
    }
  }

  @HostListener('keypress', ['$event'])
    keyPressEvent(event: KeyboardEvent) {
        if (event.key.length === 1 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    }

}