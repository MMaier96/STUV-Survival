import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiline'
})
export class MultiLinePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    console.log(`The pipe works fine with '${value}'`);
    return value;
  }

}
