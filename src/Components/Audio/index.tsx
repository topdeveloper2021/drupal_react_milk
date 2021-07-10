import React from "react";
import Loading from "../Loading";
import { GenericFileUri } from "../../DataTypes/GenericFile";
import LinkProperty from "../../DataTypes/LinkProperty";

interface AudioEntityProps {
  type: string;
  id: string;
  links: LinkProperty;
  drupal_internal__fid?: number;
  filename?: string;
  uri?: GenericFileUri;
  filemime?: string;
  filesize?: number;
  status?: boolean;
  created?: string;
  changed?: string;
}

const Audio = (props: AudioEntityProps) => {
  return (
    <>
      <Loading />
    </>
  );
};

export default Audio;
