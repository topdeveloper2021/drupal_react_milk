import * as FileDataObject from "./File";

export type AudioFileInterface = FileDataObject.FileInterface

export class AudioFile extends FileDataObject.default implements AudioFileInterface {

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

}

export default AudioFile;
