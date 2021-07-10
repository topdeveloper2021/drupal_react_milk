import LinkList, { LinkListInterface } from "./LinkList";
import User, { UserInterface } from "./User";
import PathObject, { PathObjectInterface } from "./PathObject";
import NodeType, { NodeTypeInterface } from "./NodeType";
import Entity, { EntityInterface } from "./Entity";

export interface ContentDatatypeInterface extends EntityInterface {
  changed?: string;
  created?: string;
  default_langcode?: boolean;
  drupal_internal__nid?: number;
  drupal_internal__vid?: number;
  langcode?: string;
  metatag?: Record<string, unknown>;
  node_type?: NodeTypeInterface;
  path?: PathObjectInterface;
  promote?: boolean;
  revision_log?: string;
  revision_timestamp?: string;
  revision_translation_affected?: boolean;
  revision_uid?: UserInterface;
  status?: boolean;
  sticky?: boolean;
  title?: string;
  uid?: UserInterface;
}

export default abstract class ContentDatatype
  extends Entity
  implements ContentDatatypeInterface {
  private _revision_timestamp?: Date;

  private _uid?: User;

  private _path?: PathObject;

  private _revision_uid?: User;

  default_langcode?: boolean;

  drupal_internal__nid?: number;

  drupal_internal__vid?: number;

  langcode?: string;

  metatag?: Record<string, unknown>;

  revision_log?: string;

  revision_translation_affected?: boolean;

  promote?: boolean;

  status?: boolean;

  sticky?: boolean;

  title?: string;

  constructor(incoming: ContentDatatypeInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get revision_timestamp(): string {
    return this._revision_timestamp.toString();
  }

  set revision_timestamp(incoming: string) {
    this._revision_timestamp = new Date(incoming);
  }

  get created(): string {
    return this._created.toString();
  }

  set created(incoming: string) {
    this._created = new Date(incoming);
  }

  get changed(): string {
    return this._changed.toString();
  }

  set changed(incoming: string) {
    this._changed = new Date(incoming);
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

  get uid(): UserInterface {
    return this._uid;
  }

  set uid(incoming: UserInterface) {
    this._uid = new User(incoming);
  }

  get user(): UserInterface {
    return this._uid;
  }

  set user(incoming: UserInterface) {
    this._uid = new User(incoming);
  }

  get node_type(): NodeType {
    return this._node_type;
  }

  set node_type(incoming: NodeTypeInterface) {
    this._node_type = new NodeType(incoming);
  }

  get links(): LinkListInterface {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

  get revision_uid(): UserInterface {
    return this._revision_uid;
  }

  set revision_uid(incoming: UserInterface) {
    this._revision_uid = new User(incoming);
  }
}
