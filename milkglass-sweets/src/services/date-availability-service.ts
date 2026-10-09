import { Injectable } from '@angular/core';
import { TimeRange } from '../data/time-range-enum';

@Injectable({
  providedIn: 'root',
})
export class DateAvailabilityService {
  private validDates = new Set<string>(['2026-10-29', '2026-10-30']);
  private validTimes: Record<string, TimeRange[]> = {
    '2026-10-29': [TimeRange.Morning, TimeRange.Afternoon, TimeRange.Evening],
    '2026-10-30': [TimeRange.EarlyMorning, TimeRange.LateAfternoon, TimeRange.Evening],
  };

  isValidDate(date: Date): boolean {
    return this.validDates.has(this.toDateKey(date));
  }

  getValidTimes(date: Date): TimeRange[] {
    const times = this.validTimes[this.toDateKey(date)];
    return times;
  }

  private toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
