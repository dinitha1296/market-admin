import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAllowNumbers]'
})
export class AllowNumbersDirective implements OnInit {

  @Input() allowDecimals!: boolean;

  private _inputPattern: RegExp = new RegExp('\\d');

  private _pastePattern: RegExp = new RegExp('^\\d*$')

  constructor() { }

  ngOnInit(): void {
    this._inputPattern = new RegExp(`[\\d${this.allowDecimals ? '\.' : ''}]`)
    this._pastePattern = new RegExp(`^[\\d${this.allowDecimals ? '\.' : ''}]*$`)
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    
    const input: string = event.key;
        
    const specialKeys: string[] = [
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
      'Del',
      'Delete',
      'Enter',
      'Escape',
      'End',
      'Tab'
    ];
    
    /* Allow input if it is a special key */
    
    if (specialKeys.includes(input)) {
      return;
    }

    /* Allow select All, Copy, Paste, Cut and Undo */

    if (
      (event.ctrlKey && event.key === 'a') ||
      (event.ctrlKey && event.key === 'x') ||
      (event.ctrlKey && event.key === 'v') ||
      (event.ctrlKey && event.key === 'x') ||
      (event.ctrlKey && event.key === 'z') ||
      (event.metaKey && event.key === 'a') ||
      (event.metaKey && event.key === 'c') ||
      (event.metaKey && event.key === 'v') ||
      (event.metaKey && event.key === 'x') ||
      (event.metaKey && event.key === 'z')
    ) {
      return;
    }

    /* Allow input if its a digit (or a dot if allowDecimals is true) */
    
    if (this._inputPattern.test(input)) {
      return;
    }

    event.preventDefault();
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    
    const clipboardData: string | undefined = event.clipboardData?.getData('text/plain');
    
    /* Allow pasting if is a dot or a number */

    if (clipboardData && this._pastePattern.test(clipboardData)) {
      return;
    }
    
    event.preventDefault();
  }
}
