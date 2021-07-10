import File, { FileInterface } from "./File";

export type DocumentFileInterface = FileInterface;

export class DocumentFile extends File implements DocumentFileInterface {
  getIncluded() {
    return "&field_media_file";
  }

  hasData(): boolean {
    return this.uri !== undefined && this.uri !== null;
  }

  public static getIncluded(): string {
    return "";
  }
}

export default DocumentFile;
