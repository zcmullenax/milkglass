import { Component, Input, OnInit } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { Product } from '../../../models/product';
import { Flavor } from '../../../data/flavor-enum';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SubProduct } from '../../../models/sub-product';
import { CarouselModule } from 'primeng/carousel';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-select-options-component',
  imports: [
    SelectModule,
    IftaLabelModule,
    FormsModule,
    InputNumberModule,
    CarouselModule,
    NgOptimizedImage,
    ButtonModule,
  ],
  templateUrl: './select-options-component.html',
  styleUrl: './select-options-component.scss',
})
export class SelectOptionsComponent implements OnInit {
  @Input() selectedProduct: Product = new Product();
  @Input() responsiveOptions: any[] | undefined;
  selectedFlavor: Flavor | undefined;
  selectedSubProduct: SubProduct | undefined;
  selectedQty: number = 1;
  minQty: number = 1;
  maxQty: number = 20;

  ngOnInit(): void {
    if (this.selectedProduct.flavors !== undefined && this.selectedProduct.flavors.length > 0) {
      this.selectedFlavor = this.selectedProduct.flavors[0];
    }
  }

  incrementQty(): void {
    this.selectedQty++;
    if (this.selectedQty > this.maxQty) {
      this.selectedQty = this.maxQty;
    }
  }

  decrementQty(): void {
    this.selectedQty--;
    if (this.selectedQty < this.minQty) {
      this.selectedQty = this.minQty;
    }
  }
}
