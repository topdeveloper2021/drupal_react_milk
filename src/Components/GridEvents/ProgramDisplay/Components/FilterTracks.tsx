import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import _ from "lodash";
import SelectBox from "./SelectBox";

interface FilterTracksProps {
  tracksOptions: Array<object>;
  tracks: Array<string>;
  countTracks: Array<any>;
  onClickTrack: (track: any) => void;
  onClickAllTracks: () => void;
  onClickNoneTracks: () => void;
}

const FilterTracks: React.FC<FilterTracksProps> = (
  props: FilterTracksProps
) => {
  const {
    tracksOptions,
    tracks,
    countTracks,
    onClickTrack,
    onClickAllTracks,
    onClickNoneTracks,
  } = props;

  if (!tracksOptions?.length) {
    return "";
  }

  const [expanded, setExpanded] = useState(true);

  const isSelected = (track: any) => {
    return tracks.indexOf(track.id) > -1;
  };

  const renderOptionRow = (key: number, track: any) => {
    const title = track?.title;
    return (
      <div key={key} className="filter-row">
        <SelectBox
          selected={isSelected(track)}
          onClick={() => onClickTrack(track)}
        />
        <div
          className="d-flex flex-grow-1 justify-content-between"
          dangerouslySetInnerHTML={{ __html: title }}
        >
          {/* TODO: Count
                        <span>
                            {countTracks &&
                                countTracks.length > 0 &&
                                countTracks.filter((item) => item.track === track)[0].count}
                        </span>
                    */}
        </div>
      </div>
    );
  };

  const renderArrow = () => {
    return (
      <div className="d-flex justify-content-center align-items-center pt-2 pb-3 collapse-toggler">
        {expanded ? (
          <FaChevronUp onClick={() => setExpanded(false)} />
        ) : (
          <FaChevronDown onClick={() => setExpanded(true)} />
        )}
      </div>
    );
  };

  return (
    <div className="filter-box">
      <div className="filter-header">
        <h6>Tracks</h6>
        <div className="filter-actions">
          <span onClick={onClickAllTracks} className="filter-all">
            Click all
          </span>
          {" |"}
          <span onClick={onClickNoneTracks} className="filter-none">
            {" "}
            None
          </span>
        </div>
      </div>
      {tracksOptions.map((track, index) => {
        if (index < 2) {
          return renderOptionRow(index, track);
        } else {
          if (expanded) {
            return renderOptionRow(index, track);
          } else {
            return null;
          }
        }
      })}
      {renderArrow()}
    </div>
  );
};

export default FilterTracks;
