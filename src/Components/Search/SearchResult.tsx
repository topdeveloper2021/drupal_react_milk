import React from "react";
import styled from "styled-components";

export interface SearchResultProps {
  bundle: string;
  entity_type_id: string;
  jsonapi_type: string;
  label: string;
  search_api_excerpt: string;
  search_api_relevance: number;
  type?: string;
  url: string;
  uuid: string;
}
const ResultWrapper = styled.div`
  padding: 2em 0;
`;

const ExcerptWrapper = styled.div`
  color: #333;
  & > strong {
    font-weight: bolder;
    color: black;
    background-color: yellow;
  }
`;

const MetaDataWrapper = styled.div`
  color: #666;
  > span.relevance {
    font-size: 0.5em;
    text-transform: uppercase;
    color: 999;
    margin-right: 2em;
  }
`;

export const SearchResult = (props: SearchResultProps) => {
  const {
    search_api_excerpt,
    search_api_relevance,
    uuid,
    label,
    jsonapi_type,
    url,
    bundle,
    entity_type_id,
  } = props;

  return (
    <ResultWrapper
      data-entity-type-id={entity_type_id}
      data-bundle={bundle}
      data-url={url}
      data-type={jsonapi_type}
      data-uuid={uuid}
      data-relevance={search_api_relevance}
    >
      <div data-property="link">
        <a href={url} title={label}>
          {label}
        </a>
      </div>
      <ExcerptWrapper
        data-property="search-api-excerpt"
        dangerouslySetInnerHTML={{ __html: search_api_excerpt }}
      />

      <MetaDataWrapper
        data-property="search-api-relevance"
        className="text-align-right"
      >
        <span className="relevance"> Relevance: {search_api_relevance}</span>
        <span className="badge badge-primary">{entity_type_id}</span>{" "}
        <span className="badge badge-secondary">{bundle}</span>
      </MetaDataWrapper>
    </ResultWrapper>
  );
};

export default SearchResult;
