import PropTypes from "prop-types";
import React from "react";
import SearchCard from "./SearchCard";
import SearchRow from "./SearchRow";

export default function SearchResults(props) {
  const { queryString } = props;
  const itemProps = (content) => {
    const imagePath = Object.keys(content)
      .map(
        (key) =>
          [
            "node_hero_image_tile",
            "field_photo",
            "field_thumbnail_uri",
            "field_background_image",
            "field_title_card_image",
            "field_cover",
          ].includes(key) && content[key]
      )
      .find(Boolean)
      ?.replace("public://", "/sites/default/files/");

    return {
      id: content?.uuid,
      image: imagePath,
      type: content?.aggregated_field_type.split(", ")[0] ?? content?.bundle,
      title: content?.label ?? content?.title,
      text: content?.search_api_excerpt,
      // text: "",
      link: content?.url,
      published: content?.aggregated_field_published ?? content?.published,
    };
  };

  function renderCardView(contents) {
    return (
      <div className="row">
        {contents.map((content, index) => (
          <div
            key={index}
            className="col-lg-2 col-md-3 col-sm-6 col-xs-12 mb-5"
          >
            <SearchCard {...itemProps(content)} />
          </div>
        ))}
      </div>
    );
  }

  function renderListView(contents) {
    return (
      <div className="d-flex flex-column">
        {contents.map((content, index) => (
          <div key={index}>
            <SearchRow {...itemProps(content)} />
          </div>
        ))}
      </div>
    );
  }

  if (props.contents?.length > 0) {
    return (
      <div className="search-results container-fluid">
        {props.isGrid
          ? renderCardView(props.contents)
          : renderListView(props.contents)}

        {/* TODO: PAGINATION from queryString */}
      </div>
    );
  } else {
    return <div>Sorry, we can't find any contents</div>;
  }
}

SearchResults.propTypes = {
  contents: PropTypes.any,
  isGrid: PropTypes.bool,
  queryString: PropTypes.string,
};
