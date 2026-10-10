import { Component, Inject } from '@angular/core';
import {
  DatePickerModule,
  DatePickerMonthChangeEvent,
  DatePickerYearChangeEvent,
} from 'primeng/datepicker';
import { DateAvailabilityService } from '../../../services/date-availability-service';
import { TimeRange } from '../../../data/time-range-enum';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pickup-date-selector-component',
  imports: [DatePickerModule, SelectModule, FormsModule],
  templateUrl: './pickup-date-selector-component.html',
  styleUrl: './pickup-date-selector-component.scss',
})
export class PickupDateSelectorComponent {
  // private _dateAvailability = Inject(DateAvailabilityService);
  selectedDate: Date | null = null;
  showTimePicker: boolean = false;
  disabledDates: Date[] = [];
  availableTimes: TimeRange[] = [];
  selectedTime: TimeRange | null = null;

  constructor(private _dateAvailability: DateAvailabilityService) {
    this.updateDisabledDates(new Date());
  }

  handleOnDateSelect(date: Date) {
    this.selectedDate = date;
    this.availableTimes = this._dateAvailability.getValidTimes(date);
    this.setDefaultTimeslot();
    this.showTimePicker = true;
  }

  handleOnDateClear() {
    this.selectedDate = null;
    this.showTimePicker = false;
    this.availableTimes = [];
  }

  setDefaultTimeslot(): void {
    if (
      this.selectedDate !== undefined &&
      this.availableTimes !== undefined &&
      this.availableTimes.length > 0
    ) {
      this.selectedTime = this.availableTimes[0] ?? undefined;
    }
  }

  onMonthChange(event: DatePickerMonthChangeEvent): void {
    event = this.guardDatePickerEventUndefined(event);
    this.updateDisabledDates(new Date(event.year!, event.month! - 1, 1));
  }

  onYearChange(event: DatePickerYearChangeEvent): void {
    event = this.guardDatePickerEventUndefined(event);
    this.updateDisabledDates(new Date(event.year!, event.month! - 1, 1));
  }

  private guardDatePickerEventUndefined(
    event: DatePickerMonthChangeEvent | DatePickerYearChangeEvent,
  ): DatePickerYearChangeEvent | DatePickerMonthChangeEvent {
    if (event.year == undefined) {
      event.year = new Date().getFullYear();
    }
    if (event.month == undefined) {
      event.month = new Date().getMonth();
    }
    return event;
  }

  private updateDisabledDates(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.disabledDates = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ).filter((date) => !this._dateAvailability.isValidDate(date));
  }
}
