/**
 * @interface FacetValueInterface
 */
export interface FacetValueInterface {
  id: string;
  value: string;
  label: string;
  selected?: boolean;
}

/**
 * @class FacetValue
 */
export class FacetValue implements FacetValueInterface {
  id: string;
  value: string;
  label: string;
  selected: boolean;
  occurrences: number;

  constructor(incoming) {
    this.occurrences = 0;
    this.selected = true;
    Object.assign(this, incoming);
  }
}

export interface FacetListInterface {
  label: string;
  formProperty: string;
  facets?: Array<FacetValue>;
}

export class FacetList implements FacetListInterface {
  label: string;
  formProperty: string;
  _facets: Record<string, FacetValue>;

  constructor(incoming: FacetListInterface) {
    this._facets = {};
    Object.assign(this, incoming);
    this.addFacetValue = this.addFacetValue.bind(this);
  }

  get facets(): Array<FacetValueInterface> {
    return Object.values(this._facets);
  }

  set facets(incoming: Array<FacetValueInterface>) {
    const self = this;
    incoming.map((item, key) => {
      self.addFacetValue(item);
    });
  }

  addFacetValue(incoming: FacetValue) {
    if (!this._facets.hasOwnProperty(incoming.id)) {
      this._facets[incoming.id] = new FacetValue(incoming);
    }
    this._facets[incoming.id].occurrences += 1;
  }
}

export class FacetListManager {
  _facetLists: Record<string, FacetList>;

  constructor(props = null) {
    this._facetLists = {};
    if (props) {
      Object.assign(this, props);
    }
  }

  get facetLists(): Array<FacetListInterface> {
    return Object.values(this._facetLists);
  }

  set facetLists(incoming: Array<FacetListInterface>) {
    const self = this;
    incoming.map((item, key) => {
      self.addFacetList(item);
    });
  }

  hasFacetList(id: string): boolean {
    return this.facetListIds.indexOf(id) !== -1;
  }

  get facetListIds(): Array<string> {
    return Object.keys(this._facetLists);
  }

  getFacetList(id): FacetList {
    return this._facetLists[id] ?? null;
  }

  hasFacetList(id): boolean {
    return this._facetLists?.hasOwnProperty(id);
  }

  addFacetList(label: string, formProperty: string) {
    if (!this._facetLists?.hasOwnProperty(formProperty)) {
      this._facetLists[formProperty] = new FacetList({
        label,
        formProperty,
        facets: [],
      });
    }
  }

  addFacetValue(formProperty: string, facetValue: FacetValueInterface) {
    if (!this.hasFacetList(formProperty)) {
      this.addFacetList(formProperty, formProperty);
    }
    this.getFacetList(formProperty).addFacetValue(facetValue);
  }
}
