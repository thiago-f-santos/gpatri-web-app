import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from '../../../services/header-service';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  showBackButton$: Observable<boolean>;

  @Output() menuClick = new EventEmitter<void>();
  @Output() userConfigClick = new EventEmitter<void>();

  constructor(
    private headerService: HeaderService,
    private location: Location,
    private router: Router
  ) {
    this.showBackButton$ = this.headerService.showBackButton$;
  }

  goBack(): void {
    if (this.router.url.startsWith('/admin')) {
      this.router.navigate(['/']); 
    } else {
      this.location.back();
    }
  }

  openMenu(): void {
    this.menuClick.emit();
  }

  openUserConfig(): void {
    this.userConfigClick.emit();
  }

}
