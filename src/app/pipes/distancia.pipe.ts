import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distancia'
})
export class DistanciaPipe implements PipeTransform {

  transform(value: number): string {

    if(value < 1000) {
      return `${value} m`;
    } else {
      let rounded = Math.round(value/1000)*1000;
      return `${rounded/1000} km`;
    }
  }

}
