import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Item {
  id: string;
  name: string;
  condition: string;
  status: 'available' | 'borrowed';
}

export interface Patrimony {
  id: String;
  patrimonyName: string;
  categoryName: string;
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class PatrimonyService {

  private mockPatrimonies: Patrimony[] = [
    {
      id: 'uuid-patrimony-1',
      patrimonyName: 'Monitores',
      categoryName: 'Equipamentos de TI',
      items: [
        { id: 'uuid-monitor-1', name: 'Monitor Dell UltraSharp 24"', condition: 'Condição: Ótima', status: 'available' },
        { id: 'uuid-monitor-2', name: 'Monitor LG 27"', condition: 'Condição: Bom', status: 'available' },
      ]
    },
    {
      id: 'uuid-patrimony-2',
      patrimonyName: 'Teclados e Mouses',
      categoryName: 'Periféricos',
      items: [
        { id: 'uuid-teclado-1', name: 'Teclado Mecânico Redragon', condition: 'Condição: Usado', status: 'available' },
        { id: 'uuid-mouse-1', name: 'Mouse Logitech MX Master 3', condition: 'Condição: Ótima', status: 'available' },
        { id: 'uuid-mouse-2', name: 'Mouse Razer Viper Mini', condition: 'Condição: Bom', status: 'available' },
      ]
    }
  ];

  constructor() { }

  getPatrimonies(): Observable<Patrimony[]> {
    return of(this.mockPatrimonies);
  }
  
}
