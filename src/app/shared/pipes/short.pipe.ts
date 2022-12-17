import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: string, maxLength: number = 25): string {
    if (!value || !maxLength || value.length <= maxLength) {
      return value;
    }
    return value.slice(0, maxLength) + ' ..)';
  }
}
