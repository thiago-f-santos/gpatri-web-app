import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HeaderService } from '../../core/services/header-service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  adminLinks = [
    { label: 'Patrimônio', path: 'patrimonios' },
    { label: 'Categorias', path: 'categorias' },
    { label: 'Solicitações', path: 'solicitacoes' },
    { label: 'Usuários', path: 'usuarios' }
  ];

  constructor(
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.showBackButton();
  }

  scrollToItem(itemElement: HTMLElement): void {
    if (itemElement) {
      itemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}
