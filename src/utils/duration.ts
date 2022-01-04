import type { TimeUnit as ChartDurationUnit } from 'chart.js';

import ValueError from '../errors/ValueError';

export enum DurationUnit {
  Millisecond = 0,
  Second = 1,
  Minute = 2,
  Hour = 3,
  Week = 4,
  Day = 5,
  Month = 6,
  Year = 7,
}

type ReactIntlDurationUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export class Duration {
  constructor(private readonly duration: number, private readonly unit: DurationUnit) {
    // empty constructor
  }

  get currDuration(): number {
    if (this.duration < 0) {
      throw new ValueError('Duration must be a positive number');
    }
    return this.duration;
  }

  get currUnit(): number {
    return this.duration;
  }

  toString(): string {
    return `${this.duration} ${Duration.getInternalDurationName(this.unit)}`;
  }

  /**
   * Retrieve internal duration name such as for logging; intentionally a static method
   * @param unit duration unit
   */
  protected static getInternalDurationName(unit: DurationUnit) {
    switch (unit) {
      case DurationUnit.Second:
        return 's';
      case DurationUnit.Minute:
        return 'mins';
      case DurationUnit.Hour:
        return 'hrs';
      case DurationUnit.Day:
        return 'days';
      case DurationUnit.Week:
        return 'wks';
      case DurationUnit.Month:
        return 'mths';
      case DurationUnit.Year:
        return 'yrs';
      default:
        return '?';
    }
  }

  convertToReactIntlDuration(): [duration: number, unit: ReactIntlDurationUnit] {
    let riDuration = this.duration;
    let riUnit: ReactIntlDurationUnit;

    switch (this.unit) {
      case DurationUnit.Millisecond:
        riDuration /= 1_000;
        riUnit = 'second';
        break;
      case DurationUnit.Second:
        riUnit = 'second';
        break;
      case DurationUnit.Minute:
        riUnit = 'minute';
        break;
      case DurationUnit.Hour:
        riUnit = 'hour';
        break;
      case DurationUnit.Day:
        riUnit = 'day';
        break;
      case DurationUnit.Week:
        riUnit = 'week';
        break;
      case DurationUnit.Month:
        riUnit = 'month';
        break;
      case DurationUnit.Year:
        riUnit = 'year';
        break;
      default:
        throw new ValueError();
    }

    return [riDuration, riUnit];
  }

  convertToChartDuration(): [duration: number, unit: ChartDurationUnit] {
    const cjDuration = this.duration;
    let cjUnit: ChartDurationUnit;

    switch (this.unit) {
      case DurationUnit.Millisecond:
        cjUnit = 'millisecond';
        break;
      case DurationUnit.Second:
        cjUnit = 'second';
        break;
      case DurationUnit.Minute:
        cjUnit = 'minute';
        break;
      case DurationUnit.Hour:
        cjUnit = 'hour';
        break;
      case DurationUnit.Day:
        cjUnit = 'day';
        break;
      case DurationUnit.Week:
        cjUnit = 'week';
        break;
      case DurationUnit.Month:
        cjUnit = 'month';
        break;
      case DurationUnit.Year:
        cjUnit = 'year';
        break;
      default:
        throw new ValueError();
    }

    return [cjDuration, cjUnit];
  }

  convertToColonSeparatedDuration(): string {
    return new Date(this.duration * 1000).toISOString().slice(14, 19);
  }
}
