import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphFacetExplorer";
import styled from "styled-components";
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import Staff from "../../DataTypes/People/Staff";
import NodeArticle from "../../DataTypes/NodeArticle";
import ListDisplay from "../ListDisplay";
import { Collapse } from "react-bootstrap";
import Select from "react-select";
import ReactPaginate from 'react-paginate';
import TeamDisplay from '../TeamDisplay';


interface ParagraphDisplayFacetExplorerProps {
  data: DataObject.default;
  view_mode: string;
}
const ParagraphDisplayFacetExplorer: React.FunctionComponent = (
  props: ParagraphDisplayFacetExplorerProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayFacetExplorer: Data from Props ", data);

  const [fetchRan, setFetchRan] = useState(false);
  const [sortOptions, setSortOptions] = useState([
    { value: "new-old", label: "Newest First" }, 
    { value: "old-new", label: "Oldest First" }, 
    { value: "a-z", label: "By Title A to Z" }, 
    { value: "z-a", label: "By Title Z to A" }
  ]);
  const [contentList, setContentList] = useState(null);
  const [topicsList, setTopicsList] = useState(null);
  const [centersList, setCentersList] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [pageItemOffset, setPageItemOffset] = useState(0);
  const [filterSort, setFilterSort] = useState({ value: "new-old", label: "Newest First" });
  const [filterCenters, setFilterCenters] = useState({ raw: [], list: []});
  const [filterTopics, setFilterTopics] = useState({ raw: [], list: []});

  const filterCollections = data.field_collections?.data !== null ? data.field_collections?.name : null;
  const filterTeams = data.field_teams?.data !== null ? data.field_teams?.name : null;

  const apiParams = new DrupalJsonApiParams();

  // Hide filters until Comms approves that they show
  let hideFilterSort = true;
  let hideFilterTopics = true;
  let hideFilterCenters = true;
  let ContentListObject = [];
  let TopicsListObject = [];
  let CentersListObject = [];
  let requestURL = '';
  let resultsCount = null;
  let field_items_per_page = data.field_items_per_page;
  // Build request URL and URL parameters
  switch (data.field_facet_content_type) {
    case 'article':

      // Set Sort filter
      if (!!filterSort && !!filterSort.value) {
        console.debug("FilterSort was used: ", filterSort)
        switch(filterSort.value) {
          case 'new-old': 
            apiParams.addSort('created', 'DESC');
            break;
          case 'old-new': 
            apiParams.addSort('created', 'ASC');
            break;
          case 'a-z': 
            apiParams.addSort('title', 'ASC');
            break;
          case 'z-a': 
            apiParams.addSort('title', 'DESC');
            break;
        }
      }

      apiParams.addPageLimit(field_items_per_page); // Later, change to data.field_items_per_page

      if (filterCollections !== null) {
        apiParams.addFilter('field_collections.name', filterCollections);
      }

      if (filterTeams !== null) {
        apiParams.addFilter('field_teams.name', filterTeams);
      }

      // Add Topics as JSON API filter param
      if (filterTopics !== null && filterTopics.list?.length > 0) {
        apiParams.addFilter('field_topics.name', filterTopics.list, 'IN');
      }

      // Add Centers as JSON API filter param
      if (filterCenters !== null && filterCenters.list?.length > 0) {
        apiParams.addFilter('field_centers.name', filterCenters.list, 'IN');
      }

      apiParams.addInclude(['field_authors']);

      // Use pageItemOffset for pagination, it skips a number of records. meta.count has the total number
      requestURL = '/jsonapi/node/article?jsonapi_include=true&'
        + apiParams.getQueryString();

      if (pageItemOffset !== null) {
        requestURL += '&page[offset]=' + pageItemOffset?.toString();
      }

      console.debug("ParagraphDisplayFacetExplorer: requestURL ", requestURL);
      break;

    case 'staff':

      hideFilterSort = true;

      // Set Sort filter
      if (!!filterSort && !!filterSort.value) {
        console.debug("FilterSort was used: ", filterSort)
        switch(filterSort.value) {
          default: 
            apiParams.addSort('field_last_name', 'ASC');
            break;
        }
      }

      apiParams.addPageLimit(field_items_per_page); // Later, change to data.field_items_per_page

      if (filterCollections !== null) {
        apiParams.addFilter('field_collections.name', filterCollections);
      }

      if (filterTeams !== null) {
        apiParams.addFilter('field_teams.name', filterTeams);
      }

      // Add Topics as JSON API filter param
      if (filterTopics !== null && filterTopics.list?.length > 0) {
        apiParams.addFilter('field_topics.name', filterTopics.list, 'IN');
      }

      // Add Centers as JSON API filter param
      if (filterCenters !== null && filterCenters.list?.length > 0) {
        apiParams.addFilter('field_centers.name', filterCenters.list, 'IN');
      }

      // Use pageItemOffset for pagination, it skips a number of records. meta.count has the total number
      requestURL = '/jsonapi/people/staff?jsonapi_include=true&'
        + apiParams.getQueryString();

      if (pageItemOffset !== null) {
        requestURL += '&page[offset]=' + pageItemOffset?.toString();
      }

      console.debug("ParagraphDisplayFacetExplorer: requestURL ", requestURL);
      break;
  
    default:
      console.error("No content type specified for Facet Explorer");
      throw new Error("No content type specified for Facet Explorer");
  }

  // Fetch Content and Taxonomy Tag Lists
  if (!fetchRan) {
    setFetchRan(true);

    // Fetch Main Content 
    fetch(requestURL)
      .then((res) => res.json())
      .then((incoming) => {
        resultsCount = incoming.meta.count;
        setPageCount(Math.ceil(resultsCount / field_items_per_page));
        incoming.data.map(
          contentItem => {
            if (data.field_facet_content_type === 'article') {
              ContentListObject.push(new NodeArticle(contentItem));
            }
            if (data.field_facet_content_type === 'staff') {
              ContentListObject.push(new Staff(contentItem));
            }
          }
        )
        setContentList(ContentListObject);
        console.debug("ParagraphDisplayFacetExplorer: contentList ", contentList);
      });

    // Fetch List of Topics for filter list
    if (topicsList === null) {
      fetch('/jsonapi/taxonomy_term/topics?jsonapi_include=true')
        .then((res) => res.json())
        .then((incoming) => {
          incoming.data.map(
            contentItem => {
              TopicsListObject.push({ value: contentItem.name, label: contentItem.name });
            }
          )
          setTopicsList(TopicsListObject);
        });
    }

    // Fetch List of Centers for filter list
    if (centersList === null) {
      fetch('/jsonapi/taxonomy_term/centers?jsonapi_include=true')
        .then((res) => res.json())
        .then((incoming) => {
          incoming.data.map(
            contentItem => {
              CentersListObject.push({ value: contentItem.name, label: contentItem.name });
            }
          )
          setCentersList(CentersListObject);
        });
    }
  }

  const handlePageClick = (page) => {
    setPageItemOffset(page.selected * field_items_per_page);
    console.debug("ParagraphDisplayFacetExplorer pageItemOffset", pageItemOffset);
    console.debug("ParagraphDisplayFacetExplorer page.selected", page.selected);
    setFetchRan(false);
  }

  const selectSort = (objSelected) => {
    setFilterSort(objSelected);
    setFetchRan(false);
    console.debug("FilterSort: ", objSelected);
  }

  const selectTopics = (objSelected) => {
    let listTopics = [];
    objSelected.map(
      (item) => { listTopics.push(item.value); }
    );
    setFilterTopics({ raw: objSelected, list: listTopics});
    setFetchRan(false);
    console.debug("FilterTopics: ", listTopics);
  }

  const selectCenters = (objSelected) => {
    let listCenters = [];
    objSelected.map(
      (item) => { listCenters.push(item.value); }
    );
    setFilterCenters({ raw: objSelected, list: listCenters});
    setFetchRan(false);
    console.debug("FilterCenters: ", listCenters);
  }

  const FacetExplorerContainer = styled.div`
    max-width: 1500px !important; 

    & .filter-area {
      margin-bottom:30px;
    }
    & .sidebar-content {
      padding:0px 20px;
    }
    & .sidebar-content p {
      color: #999;
      font-size: 14px;
      font-weight: bold;
    }
    & .sidebar-content h5 {
      font-size: 20px;
      font-weight: bold;
    }
    & .sidebar-content h6 {
      color: #999;
      font-size: 14px;
    }

    & .list-display-component > div {
      display: flex;
      & a {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    } 
  `;

  const CustomSelect = styled.div`
    [class$="-control"] {
      border-radius: 0;
      border-color: lightgray;
    }
    .custom-select {
      border-radius: 0;
      border-color: lightgray;
    }
  `;

  return (
    <div>
      <FacetExplorerContainer className="container-fluid py-5">
        <Row>
          <Col lg={3}>
            { !hideFilterSort ? 
              <div className="filter-area">
                <CustomSelect>
                  <Select
                    closeMenuOnSelect={true}
                    defaultValue={filterSort}
                    placeholder={"Sort order"}
                    options={sortOptions}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={selectSort}
                  />
                </CustomSelect>
              </div>
            : ''}
            { !hideFilterTopics ?
              <div className="filter-area">
                <CustomSelect>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    defaultValue={filterTopics.raw}
                    placeholder={"Topics"}
                    options={topicsList}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={selectTopics}
                  />
                </CustomSelect>
              </div>
            : ''}
            { !hideFilterCenters ?
              <div className="filter-area">
                <CustomSelect>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    defaultValue={filterCenters.raw}
                    placeholder={"Centers"}
                    options={centersList}
                    getOptionLabel={({ label }) => label}
                    getOptionValue={({ value }) => value}
                    onChange={selectCenters}
                  />
                </CustomSelect>
              </div>
            : ''}
            <div className="filter-area sidebar-content">
              <div dangerouslySetInnerHTML={{ __html: data.field_sidebar_content?.value }} />
            </div>
          </Col>
          <Col lg={9}>
            <Row>
              <ListDisplay
                id={"content-list-".concat(data.id)}
                list={contentList}
                view_mode={data.field_view_mode}
              />
            </Row>
          </Col>
        </Row>
      </FacetExplorerContainer>
      <div className="container mb-5 py-4">
        <Row className="pagination-wrapper">
          <Col>
            {pageCount > 1 ? 
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center m-0 react-paginate'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
            : ''}
          </Col>
        </Row>
      </div>
    </div>

  );
};

export { ParagraphDisplayFacetExplorer as default, ParagraphDisplayFacetExplorerProps };
