import { Component, OnInit, Signal, ViewChild, viewChild } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart-item';
import { CartItemComponent } from './cart-item-component/cart-item-component';
import { CurrencyPipe } from '@angular/common';
import { PickupDateSelectorComponent } from '../pickup-date-selector-component/pickup-date-selector-component';
import { PaymentSelectorComponent } from '../payment-selector-component/payment-selector-component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { OrderForm } from '../../../models/order-form';
import { EmailService } from '../../../services/email-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart-component',
  imports: [
    CartItemComponent,
    CurrencyPipe,
    PickupDateSelectorComponent,
    PaymentSelectorComponent,
    StepperModule,
    ButtonModule,
  ],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent {
  cart: Signal<Cart | undefined>;
  total: Signal<number>;
  orderForm: OrderForm = new OrderForm();
  sending: boolean = false;
  status: string = '';

  readonly paymentComponent = viewChild(PaymentSelectorComponent);

  constructor(
    private _cartService: CartService,
    private _emailService: EmailService,
  ) {
    this.cart = this._cartService.cart;
    this.total = this._cartService.total;
    this.orderForm.cart = this._cartService.cart();
    this.orderForm.total = this._cartService.total();
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

  submitForm(): void {
    this.orderForm.paymentFields = this.paymentComponent()!.payment;
    console.log(this.orderForm);
    this._emailService.sendEmail(this.orderForm).subscribe({
      next: () => {
        this.status = 'Email sent successfully.';
        this.sending = false;
      },
      error: (err: HttpErrorResponse) => {
        this.status = err.error?.error ?? 'Failed to send email.';
        this.sending = false;
      },
    });
  }
}
