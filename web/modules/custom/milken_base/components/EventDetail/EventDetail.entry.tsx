import React from "react";
import ReactDOM from "react-dom";
import { EventFullDisplay } from "Components/EventDisplay/EventFullDisplay";

const EventDetailContainer = document.querySelector("event-detail");
const EventDetailData = Object.assign({}, EventDetailContainer.dataset);

console.debug("getting ready to render", EventDetailData);

ReactDOM.render(
  <EventFullDisplay
    data={EventDetailData}
    view_mode={EventDetailContainer.dataset.viewMode}
    can_edit={EventDetailContainer.dataset.canEdit}
  />,
  EventDetailContainer
);
