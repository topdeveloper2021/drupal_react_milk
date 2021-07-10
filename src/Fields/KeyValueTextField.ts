export interface KeyValueTextFieldInterface {
  key: string;
  value: string;
  description: string;
}

export class KeyValueTextField implements KeyValueTextFieldInterface {
  key: string;
  value: string;
  description: string;
}

export default KeyValueTextField;
