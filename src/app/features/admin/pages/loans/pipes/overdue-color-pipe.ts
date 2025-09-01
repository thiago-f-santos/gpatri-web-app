import { Pipe, PipeTransform } from '@angular/core';
import { Loan } from '../../../../../core/models/loan.model';

@Pipe({
  name: 'overdueColor'
})
export class OverdueColorPipe implements PipeTransform {

  transform(loan: Loan): string {
    const returnDate = new Date(loan.dataDevolucao);
    const today = new Date();
    
    if (loan.situacao === 'DEVOLVIDO' || returnDate >= today) {
      return '';
    }

    const diffTime = Math.abs(today.getTime() - returnDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const startColor = { r: 246, g: 130, b: 144 };
    const endColor = { r: 239, g: 35, b: 60 };

    const factor = Math.min(diffDays / 10, 1);

    const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  }

}
