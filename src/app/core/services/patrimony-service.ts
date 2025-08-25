import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Patrimony, PatrimonyDto } from '../models/patrimony.model';
import { ItemPatrimony, ItemPatrimonyDto } from '../models/item-patrimony.model';

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

  createPatrimony(patrimonyDto: PatrimonyDto): Observable<Patrimony> {
    const newPatrimony: Patrimony = {
      id: `uuid-patrimony-${Math.random().toString(36).substring(2, 9)}`,
      patrimonyName: patrimonyDto.patrimonyName,
      categoryName: patrimonyDto.categoryName,
      items: []
    };
    this.mockPatrimonies.push(newPatrimony);
    console.log('Criando patrimônio (mock):', newPatrimony);
    return of(newPatrimony).pipe(delay(500));
  }

  addItemToPatrimony(patrimonyId: string, itemData: ItemPatrimonyDto): Observable<ItemPatrimony> {
    const patrimony = this.mockPatrimonies.find(p => p.id === patrimonyId);
    if (!patrimony) {
      return throwError(() => new Error('Patrimônio não encontrado'));
    }
    const newItem: ItemPatrimony = {
      id: `uuid-item-${Math.random().toString(36).substring(2, 9)}`,
      name: itemData.name,
      condition: itemData.condition,
      status: 'available'
    };
    patrimony.items.push(newItem);
    console.log(`Adicionando item ao patrimônio ${patrimonyId}:`, newItem);
    return of(newItem).pipe(delay(300));
  }

  deleteItemFromPatrimony(patrimonyId: string, itemId: string): Observable<boolean> {
    const patrimony = this.mockPatrimonies.find(p => p.id === patrimonyId);
    if (!patrimony) {
      return of(false);
    }
    const initialLength = patrimony.items.length;
    patrimony.items = patrimony.items.filter(item => item.id !== itemId);
    console.log(`Deletando item ${itemId} do patrimônio ${patrimonyId}`);
    return of(patrimony.items.length < initialLength).pipe(delay(300));
  }

  deletePatrimony(patrimonyId: string): Observable<boolean> {
    const initialLength = this.mockPatrimonies.length;
    this.mockPatrimonies = this.mockPatrimonies.filter(p => p.id !== patrimonyId);
    console.log(`Deletando patrimônio com ID: ${patrimonyId}`);
    const success = this.mockPatrimonies.length < initialLength;
    return of(success).pipe(delay(500));
  }
  
}
