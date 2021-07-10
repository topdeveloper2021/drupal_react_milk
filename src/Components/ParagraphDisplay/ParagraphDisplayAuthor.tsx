import React from "react";
import ParagraphAuthor from "../../DataTypes/ParagraphAuthor";
import ListDisplay from "../ListDisplay";

export interface ParagraphDisplayAuthorProps {
  data: ParagraphAuthor;
  view_mode: string;
  key?: number;
}

export const ParagraphDisplayAuthor = (props: ParagraphDisplayAuthorProps) => {
  const { data, view_mode, key } = props;
  return (
    <div>
      <h1>Paragraph Author {props.data.title}</h1>
      <ListDisplay
        id={data.id}
        list={data.field_author}
        view_mode="author"

      ></ListDisplay>
    </div>
  );
};

export default ParagraphDisplayAuthor;
