export interface BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;
}

export class BodyField implements BodyFieldInterface {
  value: string;
  format: string;
  processed: string;
  summary: string;

  constructor(incoming: BodyFieldInterface) {
    Object.assign(this, incoming);
  }
}

export default BodyField;
