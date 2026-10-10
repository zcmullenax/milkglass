import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-component',
  imports: [NgOptimizedImage],
  templateUrl: './about-component.html',
  styleUrl: './about-component.scss',
})
export class AboutComponent {
  imagePath: string = 'https://images.milkglass-sweets.com/owner_photo.png';
}
