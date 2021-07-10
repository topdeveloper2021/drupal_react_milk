import React from "react";
import { Alert } from "react-bootstrap";

export interface ErrorDisplayProps {
  error: Error;
  key: number;
  errorInfo: Record<string, any>;
  variant: string;
}

export const ErrorDisplay = (props: ErrorDisplayProps) => {
  const { error, key, errorInfo, variant } = props;
  console.error("ERROR=>", error, errorInfo);
  return (
    <Alert variant={variant} key={key} data={errorInfo}>
      {error.message}
    </Alert>
  );
};

ErrorDisplay.defaultProps = {
  error: new Error("An Error Occurred"),
  key: 0,
  errorInfo: {},
  variant: "danger",
};

export default ErrorDisplay;
