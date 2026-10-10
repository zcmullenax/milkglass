import { Cart } from './cart';
import { PaymentFields } from './payment-fields';

export class OrderForm {
  cart: Cart | undefined;
  paymentFields: PaymentFields = new PaymentFields();
  total: number | undefined;
}
