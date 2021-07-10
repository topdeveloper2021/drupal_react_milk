import PathObject, { PathObjectInterface } from "./PathObject";
import ContentDatatype, { ContentDatatypeInterface } from "./ContentDatatype";

export interface NodeInterface extends ContentDatatypeInterface {
  drupal_internal__nid: number;
  path: PathObjectInterface;
  promoted: boolean;
  status: boolean;
  sticky: boolean;
  hasData(): boolean;
  getIncluded(): string;
}

export abstract class Node extends ContentDatatype implements NodeInterface {
  drupal_internal__nid: number;

  private _path: PathObject;

  promoted: boolean;

  status: boolean;

  sticky: boolean;

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(): string;
}

export default Node;
