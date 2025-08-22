import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  showMenu: boolean = false;
  showUserConfig: boolean = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
    console.log('Menu toggled:', this.showMenu);
  }

  toggleUserConfig() {
    this.showUserConfig = !this.showUserConfig;
    console.log('User config toggled:', this.showUserConfig);
  }
}
