import { FC, Fragment } from "react";
import { matchRoutes, useLocation, useRoutes } from "react-router-dom";

import { ErrorBoundary } from "components";

import { routes } from "./config";

const AppRoutes: FC = () => {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location);
  const appRoutes = useRoutes(routes, location);

  const Wrapper = matchedRoutes?.[0]?.route?.wrapper || Fragment;

  return (
    <ErrorBoundary>
      <Wrapper>{appRoutes}</Wrapper>
    </ErrorBoundary>
  );
};

export default AppRoutes;
