import { Pipe, PipeTransform } from '@angular/core';
import { ItemConditions } from '../types/item-conditions';

@Pipe({
  name: 'conditionDisplay',
  standalone: true
})
export class ConditionDisplayPipe implements PipeTransform {

  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    return ItemConditions[value];
  }

}
