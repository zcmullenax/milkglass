import { Component, input, EventEmitter } from '@angular/core';
import { CartItem } from '../../../../models/cart-item';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../../services/cart-service';

@Component({
  selector: 'app-cart-item-component',
  imports: [ButtonModule, InputNumberModule, FormsModule, CurrencyPipe],
  templateUrl: './cart-item-component.html',
  styleUrl: './cart-item-component.scss',
})
export class CartItemComponent {
  readonly item = input.required<CartItem>();
  removeEmitter: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  incrementEmitter: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  decrementEmitter: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor(private _cartService: CartService) {}
  incrementQty(): void {
    this._cartService.incrementItemQty(this.item());
  }

  decrementQty(): void {
    this._cartService.decrementItemQty(this.item());
  }

  removeItem(): void {
    this._cartService.removeItem(this.item());
  }
}
