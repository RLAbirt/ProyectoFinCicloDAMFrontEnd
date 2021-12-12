import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distancia'
})
export class DistanciaPipe implements PipeTransform {

  transform(value: number): string {

    if(value < 1) {
      return `${value*100} m`;
    } else {
      return `${value} km`;
    }
  }

}
