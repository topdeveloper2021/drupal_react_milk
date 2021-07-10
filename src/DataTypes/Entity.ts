import * as PathUtility from "path";
import LinkList, { LinkListInterface } from "./LinkList";
import JSONApiUrl from "./JSONApiUrl";

export interface EntityInterface {
  changed?: string;
  created?: string;
  id: string;
  links?: LinkListInterface;
  type: string;
  valid: boolean;
  [x: string]: unknown;
}

export abstract class Entity implements EntityInterface {
  id: string;

  type: string;

  private _changed?: Date;

  private _created?: Date;

  private _links?: LinkList;

  [x: string]: unknown;

  constructor(incoming: EntityInterface) {
    Object.assign(this, incoming);
  }

  get links(): LinkListInterface | undefined {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

  get created(): string | undefined {
    return this._created?.toString();
  }

  set created(incoming: string) {
    if (incoming) {
      this._created = new Date(incoming);
    }
  }

  get changed(): string | undefined {
    return this._changed?.toString();
  }

  set changed(incoming: string) {
    if (incoming) {
      this._changed = new Date(incoming);
    }
  }

  get baseDataUrl(): JSONApiUrl {
    return new JSONApiUrl(
      PathUtility.join("jsonapi", this.type.replace("--", "/"), this.id),
      new URLSearchParams("jsonapi_include=true")
    );
  }

  hasData() {
    return this._created !== undefined;
  }

  getIncluded() {
    return "";
  }

  get valid(): boolean {
    return typeof this.id === "string" && typeof this.type === "string";
  }

  set valid(value) {}
}

export default Entity;
