import { FileURIInterface } from "./File";
import { Entity, EntityInterface } from "./Entity";

export interface GenericFileInterface extends EntityInterface {
  uri: FileURIInterface;
  filemime: string;
  filesize: number;
}

export class GenericFile extends Entity implements GenericFileInterface {
  id: string;

  type: string;

  uri: FileURIInterface;

  filemime: string;

  filesize: number;

  [x: string]: unknown;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

export default GenericFile;
