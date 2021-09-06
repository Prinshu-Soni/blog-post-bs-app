import React from 'react';

interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center text-primary justify-content-center vh-100">
          <h4 className="mt-4 text-center">
            Something went wrong. Please try refreshing the page.
          </h4>
        </div>
      );
    }

    return this.props.children;
  }
}
