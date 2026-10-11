import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
@Component({
  selector: 'app-gallery-component',
  imports: [GalleriaModule],
  templateUrl: './gallery-component.html',
  styleUrl: './gallery-component.scss',
})
export class GalleryComponent implements OnInit {
  baseUrl: string = 'https://images.milkglass-sweets.com/gallery/';
  imagePaths1: string[] = [
    'honey_bee_collection.JPG',
    'bridal_shower_collection.JPG',
    'bridal_shower_packaged.JPG',
    'mini_boo_platter.JPG',
    'fathers_day.JPG',
    'first_day_school_combo.JPG',
    'first_day_school_packaged.JPG',
    'fruits_and_logo.JPG',
    'hello_summer_hexagons.JPG',
    'homecoming_collection.JPG',
    'baby_shower_collection.JPG',
    'axo_birthday_packaged.JPG',
  ];
  imagePaths2: string[] = [
    'honey_bee_packaged.JPG',
    'summertime_assortment.JPG',
    'july_fourth_minis.JPG',
    'mini_halloween_platter.JPG',
    'purple_geometric_arches.JPG',
    'school_packed_in_rows.JPG',
    'school_spirit.JPG',
    'cakepops_cookie_logo.JPG',
    'july_fourth_assortment.JPG',
    'july_fourth_packaged.JPG',
    'sea_creature_origami.JPG',
    'soccer_husky_birthday.JPG',
  ];
  images1: any[] = [];
  images2: any[] = [];

  ngOnInit(): void {
    this.images1 = this.imagePaths1.map((image) => this.baseUrl + image);
    this.images2 = this.imagePaths2.map((image) => this.baseUrl + image);
  }
}
