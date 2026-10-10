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
import { MessageService, ToastMessageOptions } from 'primeng/api';

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

  constructor(
    private _cartService: CartService,
    private _messageService: MessageService,
  ) {
    this.minQty = this._cartService.minQty;
    this.maxQty = this._cartService.maxQty;
    effect(() => {
      const selectedProduct = this.selectedProduct();
      this.resetAll();
      this.setDefaultFlavor();
      this.setDefaultOption();
    });
  }

  ngOnInit(): void {
    this.setDefaultFlavor();
    this.setDefaultOption();
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

  setDefaultOption(): void {
    if (
      this.selectedProduct() !== undefined &&
      this.selectedProduct().subProducts !== undefined &&
      this.selectedProduct().subProducts!.length > 0
    ) {
      const randomNum = this.randomInt(0, this.selectedProduct().subProducts!.length - 1);
      this.selectedSubProduct = this.selectedProduct().subProducts![randomNum] ?? undefined;
    }
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    this.showToastSuccess();
  }

  showToastSuccess(): void {
    const message: ToastMessageOptions = {
      severity: 'success',
      summary: 'Success',
      detail: `${this.selectedQty} of ${this.selectedProduct().name} added to cart`,
      life: 6000,
      key: 'cen',
    };
    this._messageService.add(message);
  }
}
