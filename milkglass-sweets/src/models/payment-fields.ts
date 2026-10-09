import { PaymentType } from '../data/payment-type-enum';

export class PaymentFields {
  customerName: string | undefined;
  customerEmail: string | undefined;
  customerPhone: string | undefined;
  paymentType: PaymentType | undefined;
  paypalIndentifer?: string;
  venmoIdentifier?: string;
}
