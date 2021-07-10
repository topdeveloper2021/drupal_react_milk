import React, { useState } from "react";
import { ParagraphsTypeInterface } from "../../DataTypes/ParagraphsType";
import Loading from "../Loading";

export interface ParagraphToolbarProps {
  onClickHandler: unknown;
  tabKey: number;
}

export const ParagraphsToolbar = (props) => {
  const [paragraphTypes, setParagraphTypes] = useState(
    new Array<ParagraphsTypeInterface>()
  );
  if (paragraphTypes.length == 0) {
    fetch("/jsonapi/paragraphs_type/paragraphs_type?jsonapi_include=true", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((ajaxData) => {
        setParagraphTypes(ajaxData.data);
      });
    return <Loading />;
  }

  console.debug("Should have paragraph types now: ", paragraphTypes);
  const { onClickHandler, tabKey } = props;
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">Create New Paragraph</div>
      <div
        className="nav nav-tabs mx-auto text-align-center"
        id="nav-tab"
        role="tablist"
      >
        {paragraphTypes.map((item, key) => {
          const itemStyle = {
            backgroundImage: `url(${item.icon_default})`,
            backgroundSize: "fit",
            backgroundRepeat: "no-repeat",
            width: "50px",
            height: "50px",
            position: "relative",
          };
          const spanStyle = {
            fontSize: ".25em",
            textTransform: "uppercase",
            textAlign: "center",
            width: "100%",
            height: "18px",
            position: "absolute",
            bottom: "0px",
            left: "0px",
            backgroundColor: "black",
            color: "white",
          };
          return (
            <a
              key={key}
              className="nav-item nav-link"
              id={"new-".concat(item.id)}
              style={itemStyle}
              title={item.label}
              onClick={onClickHandler}
              data-entity-type-id="paragraph"
              data-bundle-id={item.drupal_internal__id}
              data-type={"paragraph--".concat(item.drupal_internal__id)}
              data-id="new"
              data-tab-key={tabKey}
            >
              <div style={spanStyle} className="visually-hidden">
                {item.label}
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default ParagraphsToolbar;
