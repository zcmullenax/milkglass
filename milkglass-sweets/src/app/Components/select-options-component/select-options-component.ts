import { Component, effect, input, Input, OnInit } from '@angular/core';
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
import { CartService } from '../../../services/cart-service';

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
  readonly selectedProduct = input.required<Product>();
  @Input() responsiveOptions: any[] | undefined;
  selectedFlavor: Flavor | undefined;
  selectedSubProduct: SubProduct | undefined;
  selectedQty: number = 1;
  minQty: number;
  maxQty: number;

  constructor(private _cartService: CartService) {
    this.minQty = this._cartService.minQty;
    this.maxQty = this._cartService.maxQty;
    effect(() => {
      const selectedProduct = this.selectedProduct();
      this.resetAll();
      this.setDefaultFlavor();
    });
  }

  ngOnInit(): void {
    this.setDefaultFlavor();
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

  setDefaultFlavor(): void {
    if (
      this.selectedProduct() !== undefined &&
      this.selectedProduct().flavors !== undefined &&
      this.selectedProduct().flavors!.length > 0
    ) {
      this.selectedFlavor = this.selectedProduct().flavors![0] ?? undefined;
    }
  }

  resetQty(): void {
    this.selectedQty = this.minQty;
  }

  resetFlavor(): void {
    this.selectedFlavor = undefined;
  }

  resetSubProduct(): void {
    this.selectedSubProduct = undefined;
  }

  resetAll(): void {
    this.resetFlavor();
    this.resetQty();
    this.resetSubProduct();
  }

  addToCart(): void {
    this._cartService.addItem(
      this.selectedProduct(),
      this.selectedFlavor,
      this.selectedSubProduct,
      this.selectedQty,
    );
  }
}
