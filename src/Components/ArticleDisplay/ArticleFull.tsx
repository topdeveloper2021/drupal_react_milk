import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SlideDisplay } from "../SlideDisplay";
import { NodeArticle, NodeArticleInterface } from "../../DataTypes/NodeArticle";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import styled from "styled-components";
import moment from "moment";
import AuthorsDisplay from "../AuthorsDisplay";
import { TagsDisplay } from "../TagsDisplay";
import { SocialDisplay } from "../SocialDisplay";

export interface ArticleFullProps {
  data: NodeArticleInterface;
  view_mode: string;
}

export const ArticleFull = (props: ArticleFullProps) => {
  const { data, view_mode } = props;
  const DataObject = new NodeArticle(data);
  const [nodeArticleData, setNodeArticleData] = useState(DataObject);
  if (!nodeArticleData.hasData()) {
    console.debug("retrieving node data", nodeArticleData);
    const ecp = new EntityComponentProps(nodeArticleData);
    ecp
      .getData(nodeArticleData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setNodeArticleData(new NodeArticle(ajaxData.data));
      });
    return <Loading />;
  }
  console.debug("Should have node data now", nodeArticleData);

  const ElMainContentWrapper = styled.div`
    width: 90%;
    margin: 2em auto;
    
    & .section-social {
      order: 1;

      @media only screen and (max-width: 1199px) {
        order: 3;
      }
    }
    
    & .section-content {
      order: 2;

      & .embedded-entity img {
        max-width: 100%;
      }

      @media only screen and (max-width: 1199px) {
        order: 1;
      }

      & section > .container {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      
      & .paragraph-body-content {
        & .row {
          display: block;
        }
        
        & p {
          color: #000;
          line-height: 1.5em;
          margin-bottom: 1.5em;
        }
      }
    }

    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199px) {
        order: 2;
      }

      & .published-date {
        font-family: LatoWebItalic;
        font-size: 1.25em;
        color: #999AA3;
        line-height: 1.8em;
      }
    }
  `;

  const published_synthetic = nodeArticleData.published_at !== null ? moment(nodeArticleData.published_at) : moment(nodeArticleData.created, "ddd MMM DD YYYY Z");

  let tagList = [];

  if (nodeArticleData.field_tags.length !== undefined && nodeArticleData.field_tags.length > 0) {
    nodeArticleData.field_tags.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (nodeArticleData.field_topics.length !== undefined && nodeArticleData.field_topics.length > 0) {
    nodeArticleData.field_topics.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (nodeArticleData.field_region.length !== undefined && nodeArticleData.field_region.length > 0) {
    nodeArticleData.field_region.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }

  //TODO: get a default slide if field_promo_slide is empty

  let authorList = [];

  if (nodeArticleData.field_authors.length !== undefined && nodeArticleData.field_authors.length > 0) {
    nodeArticleData.field_authors.map(
      (item) => {
        authorList.push({
          photo: item.field_photo[0],
          name: item.field_first_name + " " + item.field_last_name,
          pgtitle: item.field_pgtitle,
          link: "/people/" + item.drupal_internal__id,
          isHidden: item.field_hidden,
        });
      }
    )
  }

  return (
    <>
      <Row id={`promo-slide-${nodeArticleData.id}`}>
        <Container fluid style={{ position: "relative" }}>
          <SlideDisplay
            data={nodeArticleData.field_promo_slide}
            view_mode={"full"}
          />
        </Container>
      </Row>
      <Row>
        <ElMainContentWrapper className="container-fluid">
          <Row>
            <Col xs="12" xl="1" className="section-social">
              <SocialDisplay data={{ "name": nodeArticleData.title }}></SocialDisplay>
            </Col>
            <Col className="d-block d-xl-none">
              <AuthorsDisplay data={{ authorList: authorList }} />
            </Col>
            <Col xs="12" xl="8" className="section-content">
              <ErrorBoundary>
                <ParagraphDisplayList
                  list={nodeArticleData.field_content}
                  view_mode="full"
                />
              </ErrorBoundary>
            </Col>
            <Col xs="12" xl="3" className="section-tags mb-3">
              <div className="published-date container mb-3">{"Published " + published_synthetic.format('MMMM D, YYYY')}</div>
              <div className="authors-display d-none d-xl-block">
                <AuthorsDisplay data={{ authorList: authorList }} />
              </div>
              <TagsDisplay data={{ tagList: tagList }} />
            </Col>
          </Row>
        </ElMainContentWrapper>
      </Row>
    </>
  );
};

export default ArticleFull;
