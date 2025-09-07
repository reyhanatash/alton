import { Component } from '@angular/core';
import { NgForOf, NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";
export interface imenu {
  id: number;
  text: string;
  link: string;
  roleAccess: number[];
  icon: string
}

export const Menu: imenu[] = [
  { id: 0, text: "کاربران", link: '/users', roleAccess: [], icon: '' },
];
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sidebarMenu: any[] = [];
  selectedSideBarItem: any;

  ngOnInit() {
    this.sidebarMenu = Menu;

  }
}
