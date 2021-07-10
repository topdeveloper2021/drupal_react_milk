import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type ParagraphFourTileBlockQueueInterface = RevisionableEntityInterface;

class ParagraphFourTileBlockQueue extends RevisionableEntity {
  hasData(): boolean {
    return true;
  }

  getIncluded(): string {
    return "";
  }
}

export {
  ParagraphFourTileBlockQueue as default,
  ParagraphFourTileBlockQueueInterface,
};
