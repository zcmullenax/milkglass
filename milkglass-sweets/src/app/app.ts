import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar-component/navbar-component';
import { FooterComponent } from './Components/footer-component/footer-component';
import { updatePrimaryPalette } from '@primeuix/themes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('milkglass-sweets');

  ngOnInit(): void {}
}
