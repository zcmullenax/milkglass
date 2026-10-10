import { TimeRange } from '../data/time-range-enum';
import { Cart } from './cart';
import { PaymentFields } from './payment-fields';

export class OrderForm {
  cart: Cart | undefined;
  paymentFields: PaymentFields = new PaymentFields();
  total: number | undefined;
  selectedDate: Date | null = null;
  selectedTime: TimeRange | null = null;
}
