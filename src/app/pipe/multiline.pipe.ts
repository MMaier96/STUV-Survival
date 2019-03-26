import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiline'
})
export class MultilinePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    console.log(value);
    const lineBreaks = value.split("\\n").join("<br />");
    const commas = lineBreaks.split("\\,").join(",");
    return commas;
  }

}
