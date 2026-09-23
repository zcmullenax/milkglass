import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
  host: {
    class: 'footer',
  },
})
export class FooterComponent {
  private _router = inject(Router);

  executeNav(route: string): void {
    console.log(`navigating to ${route}`);
    this._router.navigate([route]);
  }
}
