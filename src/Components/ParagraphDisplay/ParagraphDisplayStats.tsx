import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphStats";
import styled from "styled-components";

interface ParagraphDisplayStatsProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayStats: React.FunctionComponent = (
  props: ParagraphDisplayStatsProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayStats: Data ", data);

  const statData = [
    {
      symbol: data.field_stat_1_h_symbol, 
      number: data.field_stat_1_h_number, 
      subscript: data.field_stat_1_h_subscript,
      description: data.field_stat_1_description
    }
  ];

  if ( data.field_stat_2_h_number !== null ){

    statData.push({
      symbol: data.field_stat_2_h_symbol, 
      number: data.field_stat_2_h_number, 
      subscript: data.field_stat_2_h_subscript,
      description: data.field_stat_2_description
    });
  }
  
  if ( data.field_stat_3_h_number !== null ){

    statData.push({
      symbol: data.field_stat_3_h_symbol, 
      number: data.field_stat_3_h_number, 
      subscript: data.field_stat_3_h_subscript,
      description: data.field_stat_3_description
    });
  }

  const StatsContainer = styled.div`
  
    @media screen and (min-width: 1200px){
      font-size: 1.25em;
    }

    & .stats-header h1 {
      font-family: 'LatoWebBold';
    }

    & .stats-stat h1 {
      color: var(--color-milken-blue);
      font-family: LatoWebLight;
      font-size: 4em;

      @media screen and (max-width: 767.98px) {
        font-size: 3.1em;
      }

      @media screen and (max-width: 575.98px) {
        font-size: 4em;
      }

      & sub {
        font-size: 0.33em;
        bottom: unset;
      }
    }
  `;

  return (
    <StatsContainer className="container py-5">
      {
        (typeof(data.field_section_header) === "string") ? 
          <Row>
            <Col className="stats-header text-align-center pb-5">
              <h1>
                {data.field_section_header}
              </h1>
              <h4 className="text-muted">
                {data.field_section_subheader}
              </h4>
            </Col>
          </Row>
        :''
      }
      <Row>
        {
          statData.map((item, key) => {
            return (
              <Col xs={12} sm={4} className="stats-stat">
                <h1 className="text-align-center">
                  {item.symbol}{item.number}<sub>{item.subscript}</sub>
                </h1>
                <p className="text-align-center text-muted">
                  {item.description}
                </p>
              </Col>
            );
            
          })
        }
      </Row>
    </StatsContainer>
  );
};

export { ParagraphDisplayStats as default, ParagraphDisplayStatsProps };
