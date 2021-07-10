import React from "react";
import { KeyValueTextFieldInterface } from "./KeyValueTextField";
import styled from "styled-components";

export interface KeyValueTextFieldDisplayProps {
  data: Array<KeyValueTextFieldInterface>;
  Container: JSX.Element;
  style: Record<string, string>;
}

export const KeyValueTextFieldDisplay = (
  props: KeyValueTextFieldDisplayProps
) => {
  const { data, Container, style } = props;
  return data.map((item: KeyValueTextFieldInterface, key: number) => {
    return (
      <Container key={key} className={item.key} style={style}>
        {item.value.replace(/(<([^>]+)>)/gi, "")}
      </Container>
    );
  });
};

KeyValueTextFieldDisplay.defaultProps = {
  data: [],
  Container: styled.div``,
  style: {},
};
