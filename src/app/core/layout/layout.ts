import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { Header } from "./components/header/header";
import { MenuModal } from './components/menu-modal/menu-modal';
import { UserModal } from './components/user-modal/user-modal';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, MenuModal, UserModal],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  showMenu: boolean = false;
  showUserConfig: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleUserConfig() {
    this.showUserConfig = !this.showUserConfig;
  }

  onLoansClick() {
    this.router.navigate(['/emprestimos']);
  }

  onAdminClick() {
    this.router.navigate(['/admin']);
  }
}
