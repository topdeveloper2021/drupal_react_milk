import React, { useState } from "react";
import { Accordion, Card, Alert, Col, Container, Row } from "react-bootstrap";
import PodcastEpisode, { PodcastEpisodeDisplay } from "../PodcastEpisodeDisplay";
import Loading from "../Loading";
import Paginator from "./Paginator";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import LinkList from "../../DataTypes/LinkList";
import PodcastBrowserNavbar from "./PodcastBrowserNavbar";
import ErrorBoundary from "../../Utility/ErrorBoundary";


export interface PodcastBrowserProps {
  data?: any;
  key?: string;
  view_mode?: string;
  currentURL?: any;
  loading?: boolean;
  activeKey?: number;
  links?: LinkList;
  error?: Error;
}

// TODO: support more than one bundle of people. Currently only supports "staff".
export const PodcastBrowser = (props: PodcastBrowserProps) => {
  const { data, key, view_mode } = props;
  const [pageCount, setPageCount] = useState(1);
  const [fetchData, setFetchData] = useState(false);
  const [fetchRan, setFetchRan] = useState(false);
  const [requestURL, setRequestURL] = useState("/jsonapi/media/podcast_episode?jsonapi_include=1&page[limit]=100&sort[sort-name-episode][direction]=DESC&sort[sort-name-episode][path]=field_episode&include=field_guests,field_media_image,field_media_audio_file");

  let field_items_per_page = 10;
  let ContentListObject = [];


  // Fetch Content and Taxonomy Tag Lists
  if (!fetchRan) {
    setFetchRan(true);

    // Fetch Main Content 
    fetch(requestURL)
      .then((res) => res.json())
      .then((incoming) => {
        let resultsCount = incoming.meta.count;
        setPageCount(Math.ceil(resultsCount / field_items_per_page));
        setFetchData(incoming);
        incoming.data.map(
          contentItem => {
            ContentListObject.push(contentItem);
          }
        )
        console.debug("PodcastBrowser: fetched object ", incoming);
      });
  }

  if (!fetchData) {
    return (
      <Loading />
    )
  }

  console.debug("PodcastBrowser: podcast items ", fetchData.data);

  return (
    <Container>
      <Row className="hero-wrapper">
        <Col>
          <Accordion defaultActiveKey={1}>
            {fetchData.data.map(
              (item, key) => {
                return (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={(key + 1)}>
                      <strong>
                        Episode {item.field_episode}: {item.field_summary?.value}
                      </strong>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={(key + 1)} data-open={((key+1) === 1)? true : false }>
                      <Card.Body>
                        <PodcastEpisodeDisplay
                          data={item}
                          view_mode='panel'
                          
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              }
            )}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default PodcastBrowser;