import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "Components/Dashboard";

const DashboardContainer = document.querySelector("dashboard");

const DashboardSource = {
  id: DashboardContainer.dataset.id,
  type: DashboardContainer.dataset.type,
  view_mode: DashboardContainer.dataset.viewMode,
  url: DashboardContainer.dataset.url,
};

ReactDOM.render(<Dashboard source={DashboardSource} />, DashboardContainer);
