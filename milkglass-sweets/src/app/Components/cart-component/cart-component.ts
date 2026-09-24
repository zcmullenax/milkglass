import { Component, OnInit, Signal } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart-item';
import { CartItemComponent } from './cart-item-component/cart-item-component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-component',
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent {
  cart: Signal<Cart | undefined>;
  total: Signal<number>;

  constructor(private _cartService: CartService) {
    this.cart = this._cartService.cart;
    this.total = this._cartService.total;
  }

  removeItem(item: CartItem): void {
    this._cartService.removeItem(item);
  }

  incrementItem(item: CartItem): void {
    this._cartService.incrementItemQty(item);
  }

  decrementItem(item: CartItem): void {
    this._cartService.decrementItemQty(item);
  }
}
