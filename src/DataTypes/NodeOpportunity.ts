import Node, { NodeInterface } from "./Node";
import TaxonomyTerm, {TaxonomyTermInterface} from "./TaxonomyTerm";
import TextField, {TextFieldInterface} from "../Fields/TextField";
import {Link} from "./LinkList";

export interface NodeOpportunityInterface extends NodeInterface {
  field_actions: TaxonomyTermInterface;
  field_focus: TaxonomyTermInterface;
  field_hub: TaxonomyTermInterface;
  field_region: TaxonomyTermInterface;
  field_short_summary: TextFieldInterface;
  field_long_description: TextFieldInterface;
  field_terms: TaxonomyTermInterface;
  field_url: Link;
}

export class NodeOpportunity extends Node implements NodeOpportunityInterface{

  private _field_actions: TaxonomyTermInterface;
  private _field_focus: TaxonomyTermInterface;
  private _field_hub: TaxonomyTermInterface;
  private _field_region: TaxonomyTermInterface;
  private _field_short_summary: TextFieldInterface;
  private _field_long_description: TextFieldInterface;
  private _field_terms: TaxonomyTermInterface;
  private _field_url: Link;

  get field_actions(): TaxonomyTermInterface {
    return this._field_actions;
  }

  set field_actions(value: TaxonomyTermInterface) {
    this._field_actions = new TaxonomyTerm(value);
  }

  get field_focus(): TaxonomyTermInterface {
    return this._field_focus;
  }

  set field_focus(value: TaxonomyTermInterface) {
    this._field_focus = new TaxonomyTerm(value);
  }

  get field_hub(): TaxonomyTermInterface {
    return this._field_hub;
  }

  set field_hub(value: TaxonomyTermInterface) {
    this._field_hub = new TaxonomyTerm(value);
  }

  get field_region(): TaxonomyTermInterface {
    return this._field_region;
  }

  set field_region(value: TaxonomyTermInterface) {
    this._field_region = new TaxonomyTerm(value);
  }

  get field_short_summary(): TextFieldInterface {
    return this._field_short_summary;
  }

  set field_short_summary(value: TextFieldInterface) {
    this._field_short_summary = new TaxonomyTerm(value);
  }

  get field_long_description(): TextFieldInterface {
    return this._field_long_description;
  }

  set field_long_description(value: TextFieldInterface) {
    this._field_long_description = new TaxonomyTerm(value);
  }

  get field_terms(): TaxonomyTermInterface {
    return this._field_terms;
  }

  set field_terms(value: TaxonomyTermInterface) {
    this._field_terms = new TaxonomyTerm(value);
  }

  get field_url(): Link {
    return this._field_url;
  }

  set field_url(value: Link) {
    this._field_url = new Link(value);
  }

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded() {
    return "&include=field_actions,field_focus,field_hub,field_region,field_terms";
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

}

export default NodeOpportunity;
