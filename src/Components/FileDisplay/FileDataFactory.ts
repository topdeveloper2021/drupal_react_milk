import { File, FileInterface } from "../../DataTypes/File";
import { ImageFile } from "../../DataTypes/ImageFile";
import { DocumentFile } from "../../DataTypes/DocumentFile";
import { AudioFile } from "../../DataTypes/AudioFile";

/**
 * Implementation of the Model:
 *
 * @param incoming: FileInterface
 */

export function FileDataFactory(incoming: FileInterface): File {
  switch (incoming.filemime) {
    case "image/png":
    case "image/jpg":
    case "image/jpeg":
    case "image/gif":
      return new ImageFile(incoming);

    case "application/pdf":
    case "application/doc":
    case "application/docx":
      return new DocumentFile(incoming);

    case "audio/mpeg":
      return new AudioFile(incoming);

    default:
      return new File(incoming);
  }
}

export default FileDataFactory;
