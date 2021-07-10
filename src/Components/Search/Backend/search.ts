import moment from "moment";

// TODO: Conditional
const apiPath = window.location.host.includes("localhost")
  ? "http://localhost:3001"
  : "";

// Value cache
let centers, topics;

const fetchSuggestions = async (params) => {
  try {
    params._format = "json";

    console.log("autosuggest backend", params);
    const response = await fetch(
      `${apiPath}/api/v1.0/autocomplete?` + new URLSearchParams(params)
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const fetchSearchResults = async (params) => {
  try {
    console.log("params api, raw", params);

    if (!params?.keywords) {
      return;
    }

    params._format = "json";
    if (!params?.items_per_page) params.items_per_page = 12;

    // TODO: Pagination

    let sortBy = "aggregated_field_published",
      sortOrder = "DESC";

    if (params?.sortby) {
      switch (params.sortby) {
        case "title":
          sortBy = "label";
          sortOrder = "ASC";
          break;
        case "relevance":
          sortBy = "search_api_relevance";
          sortOrder = "DESC";
          break;
        // case "date":
        //   sortBy = "aggregated_field_published";
        //   sortOrder = "DESC";
        //   break;
      }
      delete params.sortby;
    }

    params.sort_by = sortBy;
    params.sort_order = sortOrder;

    if (params?.date) {
      const parsedDate = params?.date.split("_"),
        date = moment().subtract(...parsedDate),
        today = moment();

      params.aggregated_field_published_op = "between";
      params["aggregated_field_published[min]"] = date.format("YYYY-MM-DD");
      params["aggregated_field_published[max]"] = today.format("YYYY-MM-DD");

      delete params.date;
    }

    if (params?.topics) {
      let passedTopics = params.topics.split("+");
      let topicIds = passedTopics.map((t) => getEntityId(topics, t));
      params.field_topics = topicIds.join("+");

      delete params.topics;
    }

    if (params?.centers) {
      let passedCenters = params.centers.split("+");
      let centerIds = passedCenters.map((t) => getEntityId(centers, t));
      params.field_centers = centerIds.join("+");

      delete params.centers;
    }

    console.log("fetching", params);

    const response = await fetch(
      `${apiPath}/api/v1.0/search?` +
        decodeURIComponent(new URLSearchParams(params).toString())
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getEntityId = (list, machineName) => {
  console.log(list, machineName);
  let item = list.find((t) => t.attributes.machine_name === machineName);
  return item?.attributes?.drupal_internal__tid;
};

const fetchTopics = async () => {
  try {
    if (!topics) {
      const response = await fetch(`${apiPath}/jsonapi/taxonomy_term/topics`);
      let result = await response.json();
      topics = result.data;
    }
    return topics;
  } catch (err) {
    return err;
  }
};

const fetchCenters = async () => {
  try {
    if (!centers) {
      const response = await fetch(`${apiPath}/jsonapi/taxonomy_term/centers`);
      let result = await response.json();
      centers = result.data;
    }
    return centers;
  } catch (err) {
    return err;
  }
};

// const fetchCentersData = async () => {
//   try {
//     const response = await fetch(`/jsonapi/centers_data`);
//     return await response.json();
//   } catch (err) {
//     return err;
//   }
// };

export {
  fetchSearchResults,
  fetchTopics,
  fetchCenters,
  // fetchCentersData,
  fetchSuggestions,
};
