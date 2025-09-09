import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]',
  standalone: true
})
export class OnlyNumber {
  constructor(private _el: ElementRef) {
  }
  @Input() OnlyNumber: any;
  @HostListener('input', ['$event']) onKeyDown(event: any) {
    let initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

@Directive({
  selector: '[ValidNumber]'
})
export class ValidNumber {
  constructor(private _el: ElementRef) {
  }
  @Input() ValidNumber: boolean | undefined;
  @HostListener('input', ['$event']) onKeyDown(event: any) {
    const initalValue = this._el.nativeElement.value;
    //let firstCheck = initalValue.replace(/^0+/g, '')
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
