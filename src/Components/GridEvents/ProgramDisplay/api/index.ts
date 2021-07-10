// @ts-nocheck
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

const API_URL = window.location.hostname.includes("milkeninstitute.org")
  ? ""
  : "http://localhost:3001/";

// @ts-ignore
export const getEventData = async (id) => {
  let eventObject;
  try {
    let urls = [
      `${API_URL}/jsonapi/event/conference?filter%5Bfield_grid_event_id%5D=${id}`,
      `${API_URL}/api/v1.0/grid_panels?_format=json&sort_order=ASC&items_per_page=1000&eventid=${id}`,
      `${API_URL}/api/v1.0/grid_speakers?_format=json&sort_order=ASC&items_per_page=1000&eventid=${id}`,
      `${API_URL}/api/v1.0/grid_tracks?_format=json&eventid=${id}`,
    ];

    const [
      eventResponse,
      panelsResponse,
      speakerResponse,
      tracksResponse,
    ] = await Promise.all(urls.map((url) => fetch(url)));

    eventObject = (await eventResponse.json()) ?? [];
    const panels = (await panelsResponse.json()) ?? [];
    const speakers = (await speakerResponse.json()) ?? [];
    const tracks = (await tracksResponse.json()) ?? [];

    eventObject = {
      ...eventObject.data[0],
      panels: panels ?? [],
      speakers: speakers ?? [],
      tracks: tracks ?? [],
    };
  } catch (err) {
    console.log(err);
  }
  return eventObject;
};

const handleResponse = (res) => {
  if (res.status === 200) {
    console.log("handleResponse", res);
    return res.data;
  }
  if (res.status > 300) {
    return {
      error: "Error",
    };
  }
  if (res.status > 400) {
    return {
      error: "Server Error",
    };
  }
};
