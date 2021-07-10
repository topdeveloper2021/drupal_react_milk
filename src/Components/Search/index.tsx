import React, { useState, useEffect } from "react";
import { useQueryState } from "use-location-state";

import { Collapse } from "react-bootstrap";
import Select, { components } from "react-select";
import {
  AiOutlineSearch,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import ReactPaginate from "react-paginate";

import styled from "styled-components";

import { Button, CustomSelect } from "../Shared/Styles";

import SearchFilter from "./SearchFilter";
import SearchToolbar from "./SearchToolbar";
import SearchResults from "./SearchResults";
import SimplePagination from "../Shared/SimplePagination";

const SearchWrapper = styled.div`
  .btn,
  .card,
  select {
    border-radius: 0;
  }

  .search--toolbars {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 150;
  }

  .search--results {
    padding-top: 220px;
  }

  .content-card {
    display: flex;
    flex-direction: column;
    height: 100%;

    .content-image-wrapper {
      position: relative;
      img {
        width: 100%;
        object-fit: cover;
        object-position: 0 25%;
        height: 200px;
      }
      span {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 8px 16px;
        background: var(--color-milken-orange);
        color: white;
      }
    }
    .content-text-wrapper {
      padding: 20px;
    }

    h5 a {
      color: #000;
      text-decoration: none;
    }
  }

  #filter-collapse {
    position: absolute;
    left: 0;
    right: 0;
    background: #fff;

    &.show {
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const throttle = require("lodash/throttle"),
  debounce = require("lodash/debounce");

import { contentAPI, staticData } from "./Backend";
import {
  minAutosuggestCharacters,
  minAutosuggestItems,
  containerClass,
} from "./Search.config";

import { sortOptions, perpageOptions } from "./Backend/static";

const FilterToggleButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash.replace("#"),
  };
}

function getHashParams() {
  var hash = window.location.hash.substring(1);
  var params = {};
  hash.split("&").map((hk) => {
    let temp = hk.split("=");
    params[temp[0]] = decodeURIComponent(temp[1].replace(/\+/g, "%20"));
  });
  return params;
}

export default function Search() {
  const searchParams = new URLSearchParams(window.location.search);

  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useQueryState("keywords", ""); // The actual url parameter as state
  const [queryInputValue, setQueryInputValue] = useState(); // Buffer for what's typed
  const [menuOpen, setMenuOpen] = useState();

  // URL-State parameters
  const [sortby, setSortby] = useQueryState("sortby", "");
  const [perpage, setPerpage] = useQueryState("items_per_page", 12);
  const [pageNumber, setPageNumber] = useQueryState("page", 0);
  const [type, setType] = useQueryState("type", "");
  const [topics, setTopics] = useQueryState("topics", "");
  const [centers, setCenters] = useQueryState("centers", "");
  const [date, setDate] = useQueryState("date", "");
  const [viewMode, setViewMode] = useQueryState("view", "grid");

  const { dateOptions, typeOptions } = staticData;
  const [topicOptions, setTopicOptions] = useState([]);
  const [centerOptions, setCenterOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [pager, setPager] = useState([]);

  const [filterState, setFilterState] = useState({
    type,
    centers,
    topics,
    date,
    sortby,
    perpage,
  });

  const filterFields = {
    type: {
      setter: setType,
      options: typeOptions,
      multiple: true,
    },
    centers: {
      setter: setCenters,
      options: centerOptions,
      multiple: true,
    },
    topics: {
      setter: setTopics,
      options: topicOptions,
      multiple: true,
    },
    date: {
      setter: setDate,
      options: dateOptions,
    },
    sortby: {
      setter: setSortby,
      options: sortOptions,
    },
    perpage: {
      setter: setPerpage,
      options: perpageOptions,
    },
  };

  if (window.location.href.includes("?")) {
    window.location.href = window.location.href.replace("?", "#");
  }

  useEffect(() => {
    console.log("useEffect, normal");
    getTopics();
    getCenters();
    locationChanged();
  }, []);

  useEffect(() => {
    if (pageNumber > 0) {
      setPageNumber(0);
    }
  }, [query, sortby, perpage, type, topics, centers, date]);

  const locationChanged = debounce(
    () => {
      const keywords = getHashParams()?.keywords;
      console.log("locationChanged", query, keywords);
      if (keywords) {
        // setQuery(keywords);
        setQueryInputValue(keywords);
      }
      fetchSearchResults();
    },
    250,
    { trailing: true }
  );

  useEffect(() => {
    window.addEventListener("hashchange", locationChanged, false);
    return () => window.removeEventListener("hashchange", locationChanged);
  }, [getCurrentLocation()]);

  // Throttle/Debounce as User Types
  let throttled = {};

  // Getter for suggestions
  const getSuggestions = async () => {
    console.debug("Query input value changed", queryInputValue);

    let suggestions = await contentAPI.fetchSuggestions({
      name: queryInputValue,
    });

    if (suggestions?.length > 3) {
      setSuggestions(
        suggestions.map((e) => {
          return { label: e.name, value: e.name };
        })
      );
    } else {
      setSuggestions([]);
    }
  };

  useEffect(
    debounce(() => {
      // TODO: Debounce/Throttle this

      if (
        !!!queryInputValue ||
        queryInputValue?.length < minAutosuggestCharacters
      ) {
        setSuggestions([]);
        return;
      }

      // typeof throttled?.cancel === "function" && throttled.cancel();

      getSuggestions();

      // if (queryInputValue?.length < 5) {
      //   throttled = throttle(cfn, 500);
      // } else {
      //   throttled = debounce(cfn, 500);
      // }
    }, 250),
    [queryInputValue]
  );

  const makeOptions = (items) => {
    if (!items) return;

    return items.map((o) => {
      return {
        value: o?.attributes?.machine_name ?? o?.id,
        label: o?.attributes?.name ?? "",
      };
    });
  };

  const fetchSearchResults = async () => {
    const params = getHashParams();
    if (!params || Object.entries(params).length === 0) {
      return;
    }
    let res = await contentAPI.fetchSearchResults(params);
    setSearchResults(res.rows);
    setPager(res.pager);
  };

  const getTopics = async () => {
    let res = await contentAPI.fetchTopics();
    const options = setTopicOptions(makeOptions(res));
  };

  const getCenters = async () => {
    let res = await contentAPI.fetchCenters();
    setCenterOptions(makeOptions(res));
  };

  //
  // Autosuggest & methods
  //
  // Pressing Enter
  const handleAutosuggestKeypress = (e) => {
    if (e.keyCode == 13) {
      handleAutosuggestCascade(e.target.defaultValue);
    }
  };

  const handleAutosuggestCascade = (newQuery) => {
    setQuery(newQuery);
    setQueryInputValue(newQuery);
    setSuggestions([]);
  };

  const handleAutosuggestQueryChange = (selection) => {
    if (selection?.label) {
      handleAutosuggestCascade(selection.label);
    }
  };

  const selectRef = React.createRef();

  // Necessary to prevent auto-selexting first select item
  const handleAutosuggestInputChange = (inputValue, { action }) => {
    selectRef.current.select.getNextFocusedOption = () => false;

    if (action === "input-change") {
      setQueryInputValue(inputValue);
    }
  };

  // Search React-Select

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <AiOutlineSearch size={30} />
        </components.DropdownIndicator>
      )
    );
  };

  const pageLinkClass = "page-link",
    pageItemClass = "page-item";

  return (
    <SearchWrapper id="search-content" className="py-3">
      <div className="search--toolbars">
        <div className={`${containerClass} search--autosuggest`}>
          <div className="row">
            <div className="col-md-3 col-lg-2 col-xl-2 text-right py-2">
              {pager && pager?.total_items > 0
                ? `${pager?.total_items} results for:`
                : ""}
            </div>
            <div className="col-md-9 col-lg-7 col-xl-8">
              <CustomSelect>
                <Select
                  ref={selectRef}
                  value={false}
                  inputValue={queryInputValue}
                  components={{
                    DropdownIndicator: DropdownIndicator,
                    IndicatorSeparator: () => null,
                  }}
                  blurInputOnSelect={false}
                  closeMenuOnSelect={false}
                  onInputChange={handleAutosuggestInputChange}
                  onChange={handleAutosuggestQueryChange}
                  placeholder={"Search"}
                  noOptionsMessage={() => null}
                  options={suggestions}
                  defaultOptions={[]}
                  indicatorsSeparator={false}
                  onKeyDown={handleAutosuggestKeypress}
                />
              </CustomSelect>
            </div>
            <div className="col-md">
              <FilterToggleButton
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-orange"
                aria-controls="filter-collapse"
                aria-expanded={menuOpen}
              >
                {menuOpen ? "Hide advanced filters" : "Show advanced filters"}
              </FilterToggleButton>
            </div>
          </div>
        </div>

        <div className={containerClass}>
          <SearchToolbar
            sortby={sortby}
            perpage={perpage}
            viewMode={viewMode}
            setSortby={setSortby}
            setPerpage={setPerpage}
            setViewMode={setViewMode}
          />
        </div>

        <SearchFilter
          filterFields={filterFields}
          filterState={filterState}
          open={menuOpen}
        />
      </div>

      <div className={`${containerClass} search--results`}>
        {searchResults && (
          <SearchResults
            isGrid={viewMode != "list"}
            contents={searchResults ?? []}
            queryString={query}
          />
        )}

        {pager && pager?.total_pages > 0 && (
          <ReactPaginate
            previousLabel={<span className="fa fa-chevron-left"></span>}
            nextLabel={<span className="fa fa-chevron-right"></span>}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pager?.total_pages}
            forcePage={pageNumber ?? 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(p) => setPageNumber(p.selected)}
            containerClassName={"pagination"}
            pageClassName={pageItemClass}
            nextClassName={pageItemClass}
            previousClassName={pageItemClass}
            breakClassName={pageItemClass}
            pageLinkClassName={pageLinkClass}
            nextLinkClassName={pageLinkClass}
            previousLinkClassName={pageLinkClass}
            breakLinkClassName={pageLinkClass}
            activeClassName={"active"}
          />
        )}
      </div>
    </SearchWrapper>
  );
}

// TODO: Ensure character # min is respected for autosuggest
// TODO: Initial page // Don't show results until some search is entered
