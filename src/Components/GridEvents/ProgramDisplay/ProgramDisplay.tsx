import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import FilterDates from "./Components/FilterDates";
import FilterTracks from "./Components/FilterTracks";
import FormatSelect from "./Components/FormatSelect";
import ProgramDay from "./Components/ProgramDay";
import NodeProgramDay from "./DataTypes/NodeProgramDay";
import SearchBar from "./Components/SearchBar";

import { getEventData } from "./api/index";

const formatOptions = [
  "Title Only", // option 0
  "Title and Summary", // option 1
  "Full Description", // option 2
  "Panels With Video Only", // option 3
];

let dataCache = {
  panels: {},
  speakers: {},
  tracks: {},
  getPanelById(id: string) {
    // @ts-ignore
    return dataCache?.panels[id] ?? null;
  },
  getSpeakerById(id: string) {
    // @ts-ignore
    return dataCache?.speakers[id] ?? null;
  },
  getTrackById(id: string) {
    // @ts-ignore
    return dataCache?.tracks[id] ?? null;
  },
};

interface ProgramDisplayProps {
  gridId: string;
  timeZone: string;
}

const ProgramDisplay: React.FC<ProgramDisplayProps> = (
  props: ProgramDisplayProps
) => {
  const { gridId, timeZone } = props;

  if (!gridId) return <div>No event id</div>;

  const [format, setFormat] = useState<number>(0); // TODO: use-location-state

  const [printFlag, setPrintFlag] = useState<boolean>(false); // TODO: use-location-state

  const [panels, setPanels] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [groupedPanels, setGroupedPanels] = useState([]);

  const [term, setTerm] = useState<string>("");
  const [terms, setTerms] = useState<string[]>([]); // TODO: use-location-state

  const [datesOptions, setDatesOptions] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]); // TODO: use-location-state
  const [countPrograms, setCountPrograms] = useState<any[]>([]);

  const [tracksOptions, setTracksOptions] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]); // TODO: use-location-state
  const [countTracks, setCountTracks] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any>(0);

  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [expandAllToggled, setExpandAllToggled] = useState<boolean>(false);

  useEffect(() => {}, [terms, dates]);

  useEffect(() => {
    if (printFlag) {
      window.print();
      setPrintFlag(false);
    }
  }, [printFlag]);

  useEffect(() => {
    fetchPanels();
  }, []);

  useEffect(() => {
    console.debug("panels updated!", panels);

    const dateGroups = _.groupBy(panels, (e) =>
      moment(e.field_panel_date_string).format("YYYY-MM-DD")
    );

    const tempDates = Object.entries(dateGroups).map((e) => e[0]);
    setDatesOptions(tempDates);
    setDates(tempDates);
    // console.debug('date options recalc', tempDates);

    const groupedPanelsTemp: any[] = [];
    tempDates.map((d) => {
      groupedPanelsTemp.push({
        date: d,
        panels: dateGroups[d],
      });
    });
    // console.debug('gruoped panels temp', groupedPanelsTemp);

    setGroupedPanels(_.sortBy(groupedPanelsTemp, (e) => e.date));
  }, [panels]);

  // @ts-ignore
  const fetchPanels = async () => {
    let res = await getEventData(gridId);
    console.debug("eventData", res);
    if (!res) {
      return;
    }

    console.log(res.tracks);

    setPanels(res.panels);
    setSpeakers(res.speakers);

    res?.panels.map((panel: any) => {
      // @ts-ignore
      dataCache.panels[panel.id] = panel;
    });
    res?.speakers.map((speaker: any) => {
      // @ts-ignore
      dataCache.speakers[speaker.id] = speaker;
    });

    if (res?.tracks.length) {
      setTracksOptions(res.tracks);
      setTracks(res.tracks.map((t: any) => t?.id));

      res?.tracks.map((track: any) => {
        // @ts-ignore
        dataCache.tracks[track.id] = track;
      });
    }
  };

  // @ts-ignore
  const getFilteredPanelGroups = () => {
    console.debug(terms, dates, tracks);

    if (!groupedPanels) {
      return;
    }

    // Step 1 - filter by marked dates
    let filteredPanelGroups = _.filter(groupedPanels, (panel) => {
      return dates.includes(panel.date);
    }).map((item) => {
      let filteredPanels = item.panels;

      // No panels
      if (filteredPanels.length == 0) {
        return;
      }

      // Filter panels with views
      if (format == 3) {
        filteredPanels = filteredPanels.filter((panel) => {
          return !!panel?.field_video;
        });
      }

      if (terms.length > 0) {
        filteredPanels =
          filteredPanels
            // @ts-ignore
            .filter((panel) => {
              let panelData = Object.values(panel).join(" ");
              panelData += panel.field_speakers
                .split(",")
                .map((e) => {
                  let speaker = dataCache.getSpeakerById(parseInt(e));
                  return `${speaker?.title} ${speaker?.field_description}`;
                })
                .join(" ");

              console.log(panelData);

              let score = 0;
              terms.map((term) => {
                score +=
                  panelData.toLowerCase().indexOf(term.toLowerCase()) != -1
                    ? 1
                    : 0;
              });
              // console.debug("match score", score, terms.length);
              return score == terms.length;
            }) ?? [];
      }

      if (tracks.length > 0 && tracksOptions.length > 0) {
        if (tracks.length < tracksOptions.length) {
          filteredPanels =
            filteredPanels
              // @ts-ignore
              .filter((panel) => {
                if (panel.field_tracks.length > 0) {
                  // NOTE: Change below from > 0 to tracks.length if match all is required
                  let panelTrackMatch =
                    _.intersection(
                      panel.field_tracks
                        .split(",")
                        .map((e: string) => parseInt(e)),
                      tracks.map((e: string) => parseInt(e))
                    ).length > 0;

                  return panelTrackMatch;
                }
              }) ?? [];
        }
      }

      item.filteredPanels = filteredPanels;
      return item;
    });

    // Sort by date
    const sortedPanels = filteredPanelGroups.sort((item) =>
      parseInt(moment(item?.field_date?.value).format("YYMMDD"))
    );
    return sortedPanels;
  };

  /**
   * Format Change handler
   */
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(parseInt(e.target.value));
  };

  const handleFilterDisplayToggle = () => {
    setFilterActive(!filterActive);
  };

  const handlePrintPage = () => {
    // print page
    setFilterActive(false);
    setPrintFlag(true);
  };

  /**
   *  Terms filter handlers
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTerm(e.target.value);
  };

  const handleInputPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (terms.indexOf(e.target.value) > -1) return;
      let arr = [...terms];
      arr.push(e.target.value);
      setTerm("");
      setTerms(arr);
    }
  };

  const handleRemoveTerm = (term: string) => {
    let array = terms.filter((item) => item !== term);
    setTerms(array);
  };

  const handleRemoveAllTerms = () => {
    setTerms([]);
    // setSessions(sessionsArray);
  };

  /**
   * Date filter handler
   */
  const handleClickDate = (date: string) => {
    let array: string[] = [...dates];

    let index = array.indexOf(date);
    if (index > -1) {
      array.splice(index, 1);
      setDates(array);
    } else {
      array.push(date);
      setDates(array);
    }
  };

  const handleClickAllDates = () => {
    setDates(datesOptions);
  };

  const handleClickNoneDates = () => {
    setDates([]);
  };

  /**
   * Track filter handler
   */
  const handleClickTrack = (track: any) => {
    console.debug("clicked", track);
    let array = [...tracks];
    let index = array.indexOf(track.id);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(track.id);
    }
    setTracks(array);
  };

  const handleClickAllTracks = () => {
    if (tracksOptions.length) {
      setTracks(tracksOptions.map((e) => e.id));
    }
  };

  const handleClickNoneTracks = () => {
    setTracks([]);
  };

  const handleExpandAllToggle = () => {
    setExpandAllToggled(true);
    setExpandAll(!expandAll);
    setFormat(2);
  };

  const ProgramDisplayWrapper = styled.div`
    & .filter-col {
      flex: 0 0 25%;
      min-width: 23em;
      @media screen and (max-width: 768px) {
        flex: 0 0 100%;
      }
    }

    & .program-day-session-wrapper {
      & h4 {
        @media screen and (min-width: 768px) {
          font-size: calc(1.3em + 0.2vw);
        }
        @media screen and (max-width: 768px) {
          font-size: calc(1.2em + 0.25vw);
        }
      }

      & .view-more-link {
        flex: 0 0 9em;
        @media screen and (max-width: 576px) {
          flex: 0 0 100%;
          max-width: 100%;
          text-align: right;
        }
      }

      & .badge {
        font-size: 0.8rem;
        background: #aaa;
        padding: 0.5rem;
        margin: 0.25rem;
      }
    }

    & .w-sm-100 {
      @media screen and (max-width: 769px) {
        width: 100%;
      }
    }
  `;

  const expandAllButton = () => (
    <button
      className="btn btn-warning w-sm-100 mb-1"
      onClick={handleExpandAllToggle}
    >
      {expandAll ? <FaMinus className="mr-1" /> : <FaPlus className="mr-1" />}
      {expandAll ? "COLLAPSE PROGRAM" : "VIEW FULL PROGRAM"}
    </button>
  );

  return (
    <ProgramDisplayWrapper>
      <div id="events-program" className="py-4">
        <Container>
          <Row className="my-3">
            <Col xs={12} sm={6} md={3}>
              <button
                className="btn btn-warning w-sm-100 mb-1"
                onClick={handleFilterDisplayToggle}
              >
                {filterActive ? "HIDE FILTERS" : "SHOW FILTERS"}
              </button>
            </Col>
            <Col xs={12} sm={6} className="d-md-none">
              {expandAllButton()}
            </Col>
            <Col xs={12} md={5} lg={6} className="form-horizontal">
              <FormatSelect
                formatOptions={formatOptions}
                format={format}
                onChange={handleFormatChange}
              />
            </Col>
            <Col md={4} lg={3} className="text-right d-none d-md-block">
              {expandAllButton()}
              <button
                className="btn btn-warning w-sm-100 mb-1 ml-3"
                onClick={handlePrintPage}
              >
                <i class="fas fa-print" />
              </button>
            </Col>
          </Row>
          <SearchBar
            term={term}
            terms={terms}
            count={panels.length}
            onInputChange={handleInputChange}
            onInputPress={handleInputPress}
            onRemoveTerm={handleRemoveTerm}
            onRemoveAllTerms={handleRemoveAllTerms}
            filterActive={filterActive}
          />
          <Row>
            {filterActive ? (
              <Col className="filter-col">
                <FilterDates
                  datesOptions={datesOptions}
                  dates={dates}
                  countPrograms={countPrograms}
                  onClickDate={handleClickDate}
                  onClickAllDates={handleClickAllDates}
                  onClickNoneDates={handleClickNoneDates}
                />
                <FilterTracks
                  tracksOptions={tracksOptions}
                  tracks={tracks}
                  countTracks={countTracks}
                  onClickTrack={handleClickTrack}
                  onClickAllTracks={handleClickAllTracks}
                  onClickNoneTracks={handleClickNoneTracks}
                />
              </Col>
            ) : null}

            <Col>
              <div className="programday-list">
                {getFilteredPanelGroups().map((item, index) => {
                  if (item && item.filteredPanels.length > 0)
                    return (
                      <div key={item.date}>
                        <ProgramDay
                          tracks={[]}
                          terms={[]}
                          timeZone={timeZone}
                          viewMode={format}
                          panels={item?.filteredPanels}
                          getSpeakerById={dataCache.getSpeakerById}
                          getTrackById={dataCache.getTrackById}
                          date={item?.date}
                          open={
                            expandAll ||
                            item?.filteredPanels.length < 5 ||
                            groupedPanels.length == 1 ||
                            (!expandAllToggled && index == 0)
                          }
                        />
                      </div>
                    );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ProgramDisplayWrapper>
  );
};

export default ProgramDisplay;
