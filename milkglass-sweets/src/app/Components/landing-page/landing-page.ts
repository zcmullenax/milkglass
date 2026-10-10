import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  private _router = inject(Router);
  executeNav(route: string): void {
    console.log(`navigating to ${route}`);
    this._router.navigate([route]);
  }
}
