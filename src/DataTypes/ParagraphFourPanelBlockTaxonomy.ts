import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

type ParagraphFourPanelBlockTaxonomyInterface = RevisionableEntityInterface;

class ParagraphFourPanelBlockTaxonomy extends RevisionableEntity {
  hasData(): boolean {
    return true;
  }

  getIncluded(): string {
    return "";
  }
}

export {
  ParagraphFourPanelBlockTaxonomy as default,
  ParagraphFourPanelBlockTaxonomyInterface,
};
