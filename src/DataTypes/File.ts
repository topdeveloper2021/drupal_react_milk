import Entity, { EntityInterface } from "./Entity";
import { UserInterface } from "./User";

export interface FileURIInterface {
  value: string;
  url: string;
}

export interface FileInterface extends EntityInterface {
  drupal_internal__fid: number;
  filemime: string;
  filename: string;
  filesize: number | string;
  status: boolean;
  uid: UserInterface;
  uri: FileURIInterface;

  hasData(): boolean;

  getIncluded(): string;
}

export class File extends Entity implements FileInterface {
  drupal_internal__fid: number;

  filemime: string;

  filename: string;

  filesize: number | string;

  status: boolean;

  uid: UserInterface;

  uri: FileURIInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData() {
    return this.filemime !== undefined;
  }

  getIncluded() {
    return "";
  }
}

export default File;
