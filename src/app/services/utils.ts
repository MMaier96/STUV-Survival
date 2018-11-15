import { Injectable } from '@angular/core';

@Injectable()
export class Utils{

  deepClone(object: any): any{
    return object.map(e => e);
  }

}
