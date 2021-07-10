import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type ParagraphBlockInterface = RevisionableEntityInterface;

class ParagraphBlock extends RevisionableEntity {
  hasData(): boolean {
    return true;
  }

  getIncluded(): string {
    return "";
  }
}

export { ParagraphBlock as default, ParagraphBlockInterface };
