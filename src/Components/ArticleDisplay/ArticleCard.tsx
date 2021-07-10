import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { NodeArticle, NodeArticleInterface } from "../../DataTypes/NodeArticle";
import SlideDisplay from "../SlideDisplay";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import SlideDisplayImageOnly from "../SlideDisplay/SlideDisplayImageOnly";

export interface ArticleCardProps {
  data: NodeArticleInterface;
  view_mode: string;
  key?: number;
}

const StyledLink = styled.a`
  border: 1px solid orange;
`;

const ArticleCard = (props: ArticleCardProps) => {
  const { data, view_mode, key } = props;
  const DataObject = new NodeArticle(data);
  const [articleData, setArticleData] = useState(DataObject);
  if (!articleData.hasData()) {
    const ecp = new EntityComponentProps(articleData);
    ecp
      .getData(articleData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setArticleData(new NodeArticle(ajaxData.data));
      });
    return <Loading />;
  }
  console.debug("Article Card", articleData);

  const published_synthetic = data.published_at !== null ? moment(data.published_at) : moment(data.created, "ddd MMM DD YYYY Z");

  const CardWrapper = styled.div`
    border-radius: 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow 250ms;

    &:hover {
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    }

    & a {
      color: #35363c;
      text-decoration: none;

      & .h5 {
        font-weight: bold;
      }
    }

    & img {
      height: 12.35vw;
      min-height: 146px;
    }

    & .card-footer {

      @media only screen and (max-width: 575.98px) {
        max-width: calc(100vw - 2.5em);
      }

      & .authors {
        color: #999AA3;
        margin: 0;
        font-size: 0.95em;
        text-overflow: ellipsis;
        white-space: nowrap; 
        overflow: hidden;
      }

    }
  `;

  const CustomCardHeader = styled.div`
    position: relative;
  `;

  const DateWrapper = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.53);
    color: white;
    text-align: right;
    padding-right: 0.5em;
    position: absolute;
    bottom: 0;
  `;

  let authors = '';
  if (data.field_authors.length !== undefined && data.field_authors.length > 0) {
    data.field_authors.map((item) => {
      authors += item.field_first_name === null ? '' : item.field_first_name
      authors += item.field_middle_name === null ? '' : (' ' + item.field_middle_name)
      authors += item.field_last_name === null ? '' : (' ' + item.field_last_name)
      authors += ', ';
    });
    authors = authors.trim().slice(0, -1);
  }

  return (
    <div className="col-sm-6 col-lg-3">
      <CardWrapper className="card text-align-left mx-1 mt-1 mb-4 w-100">
        <a
          href={articleData.path.alias}
          data-drupal-id={articleData.drupal_internal__nid}
          data-drupal-type={articleData.type}
          data-uuid={articleData.id}
        >
          <CustomCardHeader>
            <ErrorBoundary>
              <SlideDisplayImageOnly data={articleData.field_promo_slide} />
              <DateWrapper>{published_synthetic.format('MMMM D, YYYY')}</DateWrapper>
            </ErrorBoundary>
          </CustomCardHeader>
          <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
            <Card.Title
              style={{
                fontSize: "1em",
                marginBottom: "0",
              }}
            >
              {articleData.title}
            </Card.Title>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <p className="authors">{authors}</p>
          </Card.Footer>
        </a>
      </CardWrapper>
    </div>
  );
};

export default ArticleCard;
