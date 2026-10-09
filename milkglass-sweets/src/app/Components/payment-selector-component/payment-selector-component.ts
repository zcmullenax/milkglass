import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { PaymentFields } from '../../../models/payment-fields';
import { PaymentType } from '../../../data/payment-type-enum';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabel } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-payment-selector-component',
  imports: [SelectModule, InputTextModule, FormsModule, IftaLabel, InputMaskModule],
  templateUrl: './payment-selector-component.html',
  styleUrl: './payment-selector-component.scss',
})
export class PaymentSelectorComponent {
  payment: PaymentFields = new PaymentFields();
  selectedPaymentMethod: PaymentType | undefined;
  availablePaymentTypes: PaymentType[] = Object.values(PaymentType);
}
