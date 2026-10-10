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
import { MessageService, ToastMessageOptions } from 'primeng/api';

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
  readonly pickupDateComponent = viewChild(PickupDateSelectorComponent);

  constructor(
    private _cartService: CartService,
    private _emailService: EmailService,
    private _messageService: MessageService,
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

  async submitForm(): Promise<void> {
    this.orderForm.paymentFields = this.paymentComponent()!.payment;
    this.orderForm.selectedDate = this.pickupDateComponent()!.selectedDate;
    this.orderForm.selectedTime = this.pickupDateComponent()!.selectedTime;
    if (await this.isFormValid()) {
      this._emailService.sendEmail(this.orderForm).subscribe({
        next: () => {
          this.status = 'Email sent successfully.';
          this.sending = false;
          this.showToast('success');
        },
        error: (err: HttpErrorResponse) => {
          this.status = err.error?.error ?? 'Failed to send email.';
          this.sending = false;
          this.showToast('error');
        },
      });
    } else {
      this.showToast('error', false);
    }
  }

  isFormValid(): boolean {
    if (this.orderForm.selectedDate == null) {
      return false;
    }
    if (this.orderForm.selectedTime == null) {
      return false;
    }
    if (this.orderForm.paymentFields.customerName == null) {
      return false;
    }
    if (this.orderForm.paymentFields.customerEmail == null) {
      return false;
    }
    if (this.orderForm.paymentFields.customerPhone == null) {
      return false;
    }
    if (this.orderForm.paymentFields.paymentType == null) {
      return false;
    }
    if (
      this.orderForm.paymentFields.paymentType == 'PayPal' &&
      this.orderForm.paymentFields.paypalIndentifer == null
    ) {
      return false;
    }
    if (
      this.orderForm.paymentFields.paymentType == 'Venmo' &&
      this.orderForm.paymentFields.venmoIdentifier == null
    ) {
      return false;
    }
    return true;
  }

  showToast(severity: 'success' | 'error', formIsValid: boolean = true): void {
    const summary = () => {
      if (severity == 'success') {
        return 'Thank you!';
      }
      return 'Apologies,';
    };
    const detail = () => {
      if (severity == 'success') {
        return 'We have received your order and will contact you to confirm payment and pickup.';
      }
      if (formIsValid) {
        return 'There was an error submitting your order. Please try again.';
      }
      return 'Please fill out all required fields and try again';
    };
    const message: ToastMessageOptions = {
      severity: severity,
      summary: summary(),
      detail: detail(),
      life: 10000,
      key: 'cen',
    };
    this._messageService.add(message);
  }
}
