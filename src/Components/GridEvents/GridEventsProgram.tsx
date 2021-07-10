import React, { useState } from "react";
import ProgramDisplay from "./ProgramDisplay/ProgramDisplay";
import styled from "styled-components";

const MainContainer = styled.div`

  .program-day-header {
    top: 75px;
    z-index: 1;
    position: sticky;
    background: rgb(241,245,247);
    background: linear-gradient(180deg, rgba(241,245,247,1) 50%, rgba(241,245,247,0) 100%);
  }

  @media screen and (min-width: 1200px) {
    div[class^="ParagraphDisplayLinkBar"] {
      font-size: 1.25em;
    }

    #events .container {
      max-width: 1400px;
    }
  }

`;

interface GridEventsProgramProps {
  gridId: string;
  timeZone?: string;
  view_mode?: string;
}

const GridEventsProgram: React.FunctionComponent = (
  props: GridEventsProgramProps
) => {
  const { gridId, timeZone, view_mode } = props;

  let elJumbotron = document.querySelector(".jumbotron");
  if (!!elJumbotron) {
    elJumbotron.style.minHeight='unset';
    elJumbotron?.querySelector('.slide-text').classList.remove('hero-tall');
    elJumbotron?.querySelector('.slide-text').classList.add('hero-short');
  }

  return (
    <MainContainer id="events">
      <ProgramDisplay gridId={gridId} timeZone = {timeZone} />
    </MainContainer>
  );
};

export { GridEventsProgram as default, GridEventsProgramProps };
