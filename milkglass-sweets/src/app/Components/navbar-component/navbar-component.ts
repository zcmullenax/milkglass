import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar-component',
  imports: [MenubarModule, ButtonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Current Pre-Order',
        icon: 'pi pi-star',
        routerLink: '/current',
      },
      {
        label: 'Gallery',
        icon: 'pi pi-image',
        routerLink: '/gallery',
      },
      {
        label: 'About',
        icon: 'pi pi-heart',
        routerLink: '/about',
      },
    ];
  }
}
