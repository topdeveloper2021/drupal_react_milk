export interface ColorObjectInterface {
  color: string;
  opacity: number;
}

export default class ColorObject implements ColorObjectInterface {
  color: string;

  opacity: number;

  constructor(incoming: ColorObjectInterface) {
    this.color = (incoming)? incoming.color : "#ffffff";
    this.opacity = (incoming)? incoming.opacity : 1;
  }
}
