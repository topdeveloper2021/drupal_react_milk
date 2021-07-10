import PathObject from "./PathObject";
import { EntityInterface } from "./Entity";

export interface EntityComponentPropsInterface {
  view_mode?: string;
  id?: string;
  entityTypeId?: string;
  bundle?: string;
  data?: Record<string, unknown>;
  items?: Array<EntityInterface>;
  type?: string;
  error?: Error;
  onSelectHandler?: EntityInterface;
  open?: boolean;
  path?: PathObject;
}

export interface JSONAPIEntityReferenceData {
  type: string;
  id: string;
  data?: Record<string, unknown>;
  items?: Array<any>;
}

export class EntityComponentProps implements EntityComponentPropsInterface {
  view_mode: string;

  id: string;

  entityTypeId: string;

  bundle: string;

  data?: Record<string, unknown>;

  items?: Array<any>;

  key: number;

  error: Error;

  onSelectHandler: any;

  open?: boolean;

  title?: string;

  name?: string;

  constructor(incoming?: EntityComponentPropsInterface) {
    const propCopy = { ...incoming };
    if (propCopy?.type) {
      const entityInfo = incoming.type?.split("--");
      if (entityInfo !== null) {
        propCopy.entityTypeId = entityInfo[0];
        propCopy.bundle = entityInfo[1];
      }
    }
    this.setData(propCopy);
    this.handleError = this.handleError.bind(this);
  }

  toObject(): EntityComponentPropsInterface {
    return {
      view_mode: this.view_mode,
      id: this.id,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
      data: this.data,
      items: this.items,
      error: this.error,
      onSelectHandler: this.onSelectHandler,
      open: this.open,
    };
  }

  async getData(include = ""): Promise<any> {
    console.debug("get Data called: ", this);
    if (this.entityTypeId && this.bundle) {
      return fetch(
        new Request(
          `/jsonapi/${this.entityTypeId}/${this.bundle}/${
            this.id || ""
          }?jsonapi_include=1${include}`,
          { redirect: "manual" }
        )
      ).catch(this.handleError);
    }
    this.handleError(new Error("Not Enough Data to make a getData call"));
  }

  setData(incoming = null) {
    if (incoming) {
      Object.assign(this, incoming);
    }
  }

  hasData(): boolean {
    return this.data !== undefined && this.data !== null;
  }

  handleError(err) {
    this.error = err;
    console.error(
      "Entity Component Props has encountered an error with fetching the data:",
      err
    );
  }

  get loaded() {
    return this.hasData();
  }

  get label() {
    return this.title || this.name || null;
  }

  set label(incoming: string) {
    this.title = incoming;
  }
}

export default EntityComponentProps;
