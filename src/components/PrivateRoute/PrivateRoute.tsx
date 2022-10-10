import { FC } from "react";
import { RouteProps } from "react-router";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthContext } from "context/Auth";

type IPrivateRouteSpecificProps = {
  element: RouteProps["element"];
};

const PrivateRouteElement: FC<IPrivateRouteSpecificProps> = ({ element }) => {
  const {
    state: { isAuth, isLoading },
  } = useAuthContext();

  return !isLoading ? (
    isAuth ? (
      <Routes>
        <Route path="/" element={element} />
      </Routes>
    ) : (
      <Navigate to="/" />
    )
  ) : null;
};

const PrivateRoute: FC<RouteProps & IPrivateRouteSpecificProps> = ({
  element,
}) => {
  return <PrivateRouteElement element={element} />;
};

export default PrivateRoute;
