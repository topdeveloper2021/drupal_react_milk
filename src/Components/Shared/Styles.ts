import styled from "styled-components";

export const Button = styled.button`
  border-radius: 0;

  &.btn-text {
    border: 0;
    background: transparent;
  }

  &.btn-orange {
    background: var(--color-milken-orange);
    color: #fff;
    text-transform: uppercase;
  }
`;

export const CustomSelect = styled.div`
  [class$="-control"] {
    border-radius: 0;
    border-color: var(--color-milken-borders);
  }
  .custom-select {
    border-radius: 0;
    border-color: var(--color-milken-borders);
  }
  input[id^="react-select"],
  div[class$="-ValueContainer"] > div[class$="-Input"] {
    width: 100% !important;
  }
`;
