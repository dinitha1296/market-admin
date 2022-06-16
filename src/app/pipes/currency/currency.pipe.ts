import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return "Rs. " + value.toFixed(2);
  }

}
