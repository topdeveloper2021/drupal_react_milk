import React from "react";
import ErrorDisplay from "./ErrorDisplay";

export interface ErrorBoundaryProps {
  key?: number;
}

export interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
  errorInfo?: Record<string, any>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    const { key } = props;
    this.state = {
      error: null,
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.debug("getDerivedStateFromError", error);
    return {
      error,
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error: error, errorInfo: errorInfo });
    console.error(error, errorInfo);
  }

  render() {
    const { error, hasError, errorInfo } = this.state;
    const { children, key } = this.props;

    return hasError ? (
      <ErrorDisplay error={error} key={key} errorInfo={errorInfo} />
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
