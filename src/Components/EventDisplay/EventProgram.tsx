import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { EventInterface } from "../../DataTypes/Event";
import FilterDates from "./FilterDates";
import FilterTracks from "./FilterTracks";
import FormatSelect from "./FormatSelect";
import _ from "lodash";
import moment from "moment";
import ProgramDay from "./ProgramDay";
import { getEventData } from "../../api/index.js";
import NodeProgramDay from "../../DataTypes/NodeProgramDay";
import SearchBar from "./SearchBar";
import "./event.scss";

const formatOptions = [
  "Session name only",
  "Name and short summary",
  "Session details",
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
};

const EVENT_ID = "gc20";

export interface EventProgramProps {
  gridID: string;
  data: EventInterface;
  event_id: string;
}

export const EventProgram = (props: EventProgramProps) => {
  const [format, setFormat] = useState<number>(0); // TODO: use-location-state

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

  useEffect(() => {}, [terms, dates]);

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

  // TODO: Dates options
  // useEffect(() => {
  //     setDates(datesOptions);
  // }, [datesOptions]);

  // TODO: Tracks
  // useEffect(() => {
  //     let countArr: any[] = [];
  //     tracksOptions.map((track) => {
  //         countArr.push({
  //             track: track,
  //             count: sessions.filter((item) => item.field_tracks.indexOf(track) > -1).length
  //         });
  //     });
  //     console.log('setCountTracks', sessions, countArr);
  //     setCountTracks(countArr);
  // }, [tracksOptions, sessions]);
  //
  // useEffect(() => {
  //     setTracks(tracksOptions);
  // }, [tracksOptions]);

  // TODO: Term filtering
  // useEffect(() => {
  //     console.log('terms', terms, terms.length);
  //     if (terms.length > 0) {
  //         let arr = sessionsArray.filter(
  //             (session) =>
  //                 terms.findIndex((term) => session.field_long_description.indexOf(term) > -1) >
  //                 -1
  //         );
  //         console.log('sessions array filtered by terms', arr);
  //         setSessions(arr);
  //     } else {
  //         setSessions(sessionsArray);
  //     }
  // }, [terms]);

  // @ts-ignore
  const fetchPanels = async () => {
    let res = await getEventData(EVENT_ID);
    console.log("eventData", res);
    if (!res) {
      return;
    }

    setPanels(res.panels);
    setSpeakers(res.speakers);
    setTracksOptions(res.tracks);
    setTracks(res.tracks.map((t: any) => t?.id));

    res.panels.map((panel: any) => {
      // @ts-ignore
      dataCache.panels[panel.id] = panel;
    });
    res.speakers.map((speaker: any) => {
      // @ts-ignore
      dataCache.speakers[speaker.id] = speaker;
    });
    res.tracks.map((track: any) => {
      // @ts-ignore
      dataCache.tracks[track.id] = track;
    });
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

      if (terms.length > 0) {
        filteredPanels =
          filteredPanels
            // @ts-ignore
            .filter((panel) => {
              const panelData = Object.values(panel).join(" ").toLowerCase();

              let score = 0;
              terms.map((term) => {
                score += panelData.indexOf(term.toLowerCase()) != -1 ? 1 : 0;
              });
              console.log("score", score, terms.length);
              return score == terms.length;
            }) ?? [];
      }

      if (tracks.length > 0) {
        filteredPanels =
          filteredPanels
            // @ts-ignore
            .filter((panel) => {
              // NOTE: Change below from > 0 to tracks.length if match all is required
              if (panel.field_tracks.length > 0) {
                console.log(tracks);
                let panelTrackMatch =
                  _.intersection(
                    panel.field_tracks
                      .split(",")
                      .map((e: string) => parseInt(e)),
                    tracks.map((e: string) => parseInt(e))
                  ).length > 0;
                console.log(panelTrackMatch);
                return panelTrackMatch;
              }
            }) ?? [];
      } else {
        filteredPanels = [];
      }

      console.log("filter diff", filteredPanels.length, item.panels.length);

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
  };

  /**
   *  Terms filter handlers
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleInputPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (terms.indexOf(term) > -1) return;
      let arr = [...terms];
      arr.push(term);
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
    console.log(track);
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
    if (tracksOptions) {
      setTracks(tracksOptions.map((e) => e.id));
    }
  };

  const handleClickNoneTracks = () => {
    setTracks([]);
  };

  // const handleSessionsLoad = (daySessions: any[]) => {
  //     let arr = sessionsArray.concat(daySessions);
  //     sessionsArray = arr;
  //     console.log('handleSessionsLoad', sessionsArray);
  //     // setSessions(sessionsArray);
  //
  //     let tracksArr: any = [];
  //     sessionsArray.map((session) => {
  //         session.field_tracks.map((track: string) => {
  //             if (tracksArr.indexOf(track) < 0) {
  //                 tracksArr.push(track);
  //             }
  //         });
  //     });
  //     setTracksOptions(tracksArr);
  // };

  return (
    <div id="events">
      <Container>
        <Row className="my-3">
          <Col sm={5} md={3}>
            <button
              className="btn btn-warning"
              onClick={handleFilterDisplayToggle}
            >
              {filterActive ? "HIDE FILTERS" : "SHOW FILTERS"}
            </button>
          </Col>
          <Col sm={7} md={6} className="form-horizontal">
            <FormatSelect
              formatOptions={formatOptions}
              format={format}
              onChange={handleFormatChange}
            />
          </Col>
          <Col sm={6} md={3}>
            <button className="btn btn-warning" onClick={handlePrintPage}>
              PRINT THIS FORMAT
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
            <Col sm={6} md={4} lg={3}>
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

          <Col sm={6} md={8} lg={9} style={{ marginTop: -67 }}>
            <div className="programday-list">
              {getFilteredPanelGroups().map((item, index) => {
                if (item && item.filteredPanels.length > 0)
                  return (
                    <div key={item.date}>
                      <ProgramDay
                        tracks={[]}
                        terms={[]}
                        viewMode={format}
                        panels={item?.filteredPanels}
                        getSpeakerById={dataCache.getSpeakerById}
                        date={item?.date}
                        open={groupedPanels.length == 1 && index == 0}
                      />
                    </div>
                  );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventDisplay;
