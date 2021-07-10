import React from "react";
import { FileInterface } from "../../DataTypes/File";
import { ImageFileDisplay } from "./ImageFileDisplay";
import { DocumentFileDisplay } from "./DocumentFileDisplay";
import { AudioFileDisplay } from "./AudioFileDisplay";
import { GenericFileDisplay } from "./GenericFileDisplay";

/**
 * Implementation of the View
 *
 * @param incoming: FileInterface
 */
export function FileComponentFactory(
  incoming: FileInterface
): React.FunctionComponent {
  switch (incoming.filemime) {
    case "image/png":
    case "image/jpg":
    case "image/jpeg":
    case "image/gif":
      return ImageFileDisplay;

    case "application/pdf":
    case "application/doc":
    case "application/docx":
      return DocumentFileDisplay;

    case "audio/mpeg":
      return AudioFileDisplay;

    default:
      return GenericFileDisplay;
  }
}

export default FileComponentFactory;
