export interface LinkInterface {
  href: string;
  title?: string;
  uri?: string;
}

export class Link implements LinkInterface {
  title: string;

  private _href: string;

  constructor(incoming: LinkInterface) {
    Object.assign(this, incoming);
  }

  get href(): string {
    return this._href;
  }

  set href(value) {
    this._href = value;
  }

  get uri(): string {
    return this._href;
  }

  set uri(incoming: string) {
    this._href = incoming;
  }
}

export interface LinkListInterface {
  self?: LinkInterface;
  previous?: LinkInterface;
  next?: LinkInterface;
  first?: LinkInterface;
  last?: LinkInterface;
}

export default class LinkList implements LinkListInterface {
  private _self?: Link;

  private _previous?: Link;

  private _next?: Link;

  private _first?: Link;

  private _last?: Link;

  constructor(incoming: LinkListInterface) {
    Object.assign(this, incoming);
  }

  get self(): Link {
    return this._self;
  }

  set self(value: Link) {
    this._self = value;
  }

  get previous(): Link {
    return this._previous;
  }

  set previous(value: Link) {
    this._previous = value;
  }

  get next(): Link {
    return this._next;
  }

  set next(value: Link) {
    this._next = value;
  }

  get first(): Link {
    return this._first;
  }

  set first(value: Link) {
    this._first = value;
  }

  get last(): Link {
    return this._last;
  }

  set last(value: Link) {
    this._last = value;
  }
}
