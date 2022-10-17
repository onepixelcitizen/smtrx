import { FC, PropsWithChildren } from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </>
  );
};

const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={() => undefined}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
