import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupee'
})
export class RupeePipe implements PipeTransform {

  transform(value: number): string {
    return "Rs. " + value.toFixed(2);
  }

}
