import { Injectable } from '@angular/core';
import { TimeRange } from '../data/time-range-enum';

@Injectable({
  providedIn: 'root',
})
export class DateAvailabilityService {
  private validDates = new Set<string>(['2026-10-28', '2026-10-30', '2026-10-31']);
  private validTimes: Record<string, TimeRange[]> = {
    '2026-10-28': [TimeRange.Evening],
    '2026-10-30': [TimeRange.Evening],
    '2026-10-31': [TimeRange.EarlyMorning, TimeRange.EarlyAfternoon],
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
