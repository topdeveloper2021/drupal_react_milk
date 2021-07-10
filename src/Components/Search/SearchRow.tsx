import PropTypes from "prop-types";
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

const MAX_LENGTH_LIMIT = 100;

function TextEllipsis({ text }) {
  const [showmore, setShowmore] = useState(false);

  const renderViewMoreButton = () => {
    return (
      <button
        className="btn btn-primary d-block mt-3"
        onClick={() => setShowmore(!showmore)}
        aria-controls="text-collapse"
        aria-expanded={showmore}
      >
        {showmore ? "View Less" : "View More"}
      </button>
    );
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: text.substring(0, MAX_LENGTH_LIMIT - 3),
        }}
      ></div>
      <Collapse in={showmore}>
        <div id="text-collapse">
          <div
            dangerouslySetInnerHTML={{
              __html: text.substring(MAX_LENGTH_LIMIT - 3, text.length),
            }}
          ></div>
        </div>
      </Collapse>

      {renderViewMoreButton()}
    </>
  );
}

TextEllipsis.propTypes = {
  text: PropTypes.string,
};

function SearchRow({ image, type, title, text }) {
  return (
    <div class="card mb-1">
      <div className="row d-flex">
        <div className="col-lg-9 col-sm-6">
          <div className="content-text-wrapper px-4 py-4">
            <h5>{title}</h5>
            {text && text.length > MAX_LENGTH_LIMIT ? (
              <TextEllipsis text={text} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: text }}></div>
            )}
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div
            className="content-image-wrapper"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              height: "300px",
            }}
          >
            {!!type && type != "node" ? <span>{type}</span> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

SearchRow.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
};

export default SearchRow;
