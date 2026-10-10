import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderForm } from '../models/order-form';
import { Observable } from 'rxjs';

interface SendEmailResponse {
  success?: boolean;
  id?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private http = inject(HttpClient);

  sendEmail(request: OrderForm): Observable<SendEmailResponse> {
    return this.http.post<SendEmailResponse>('/api/send-email', request);
  }
}
