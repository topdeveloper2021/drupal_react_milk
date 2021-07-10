import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type ParagraphFourPanelInterface = RevisionableEntityInterface;

class ParagraphFourPanel extends RevisionableEntity {
  hasData(): boolean {
    return true;
  }

  getIncluded(): string {
    return "";
  }
}

export { ParagraphFourPanel as default, ParagraphFourPanelInterface };
