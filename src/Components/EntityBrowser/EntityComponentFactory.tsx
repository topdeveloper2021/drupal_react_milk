import React from "react";
import EventDisplay from "../EventDisplay";
import NodeDisplay from "../NodeDisplay";
import MediaDisplay from "../MediaDisplay";
import SlideDisplay from "../SlideDisplay";
import FileDisplay from "../FileDisplay";
import { EntityInterface } from "../../DataTypes/Entity";
import { SearchResult, SearchResultProps } from "../Search/SearchResult";
import {PeopleDisplay} from "../PeopleDisplay";

export const EntityComponentFactory = (
  source: EntityInterface | SearchResultProps
) => {
  if (typeof source?.type !== "undefined") {
    const entityTypeId = source.type.split("--").shift();
    switch (entityTypeId) {
      case "event":
        return EventDisplay;
      case "node":
        return NodeDisplay;
      case "media":
        return MediaDisplay;
      case "slide":
        return SlideDisplay;
      case "file":
        return FileDisplay;
      case "people":
        return PeopleDisplay;
      default:
        console.error("Cannot determine Component Class", source);
        throw new Error(
          "Cannot Determine Component Class for ".concat(source.type)
        );
    }
  }
  if (typeof source?.jsonapi_type !== "undefined") {
    return SearchResult;
  }
  console.error("Cannot determine Component Class", source);
  throw new Error("Cannot Determine Component Class for ".concat(source.type));
};

export default EntityComponentFactory;
