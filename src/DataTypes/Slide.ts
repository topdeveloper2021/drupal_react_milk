import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

export interface SlideKeyValueTextInterface {
  key: string;
  description: string;
  value: string;
  format: string;
  processed: string;
}

export class SlideKeyValueText {
  key: string;

  description: string;

  value: string;

  format: string;

  processed: string;

  constructor(incoming: SlideKeyValueTextInterface) {
    Object.assign(this, incoming);
  }
}

export interface SlideInterface extends RevisionableEntityInterface {
  drupal_internal__id: number;
  label: string;
}

export abstract class Slide
  extends RevisionableEntity
  implements SlideInterface {
  drupal_internal__id: number;

  get label(): string {
    return this.title ?? this.name;
  }

  set label(incoming: string) {
    this.title = incoming;
  }
}

export default Slide;
