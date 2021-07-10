export const typeOptions = [
  { value: "article", label: "Articles" },
  { value: "center", label: "Centers" },
  { value: "event", label: "Events" },
  { value: "people", label: "People" },
  { value: "podcast", label: "Podcast" },
  { value: "program", label: "Programs" },
  { value: "report", label: "Reports" },
  { value: "staff", label: "Staff" },
  { value: "video", label: "Videos" },
];

export const dateOptions = [
  { value: null, label: "Any" },
  { value: "1_month", label: "Within the last month" },
  { value: "6_month", label: "Within the last 6 months" },
  { value: "1_year", label: "Within the last year" },
];

export const sortOptions = [
  { value: null, label: "Date" },
  { value: "relevance", label: "Relevance" },
  { value: "title", label: "Name" },
  // TODO: Post-launch
  // { value: "type", label: "Type" },
];

export const perpageOptions = [12, 24, 48];
