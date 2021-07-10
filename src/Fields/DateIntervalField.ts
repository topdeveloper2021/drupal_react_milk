export interface DateIntervalFieldInterface {
  value: string;
  end_value: string;
}

export class DateIntervalField implements DateIntervalFieldInterface {
  _value: Date;
  _end_value: Date;

  constructor(props) {
    Object.assign(this, props);
  }

  get value(): string {
    return this._value.toISOString();
  }

  set value(incoming: string) {
    this._value = new Date(incoming);
  }

  get end_value(): string {
    return this._end_value.toISOString();
  }

  set end_value(incoming: string) {
    this._end_value = new Date(incoming);
  }

  getValue(): Date {
    return this._value;
  }

  getEndValue(): Date {
    return this._end_value;
  }
}

export default DateIntervalField;
