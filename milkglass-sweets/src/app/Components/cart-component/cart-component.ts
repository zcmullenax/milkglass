import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-cart-component',
  imports: [],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent implements OnInit {
  cart: Cart | undefined;
  total: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this._cartService.cart();
    this.total = this._cartService.total();
  }
}
