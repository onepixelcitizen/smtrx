import { Dashboard } from "pages";

import { DashboardWrapper, PrivateRoute } from "components";

export default [
  {
    path: "/dashboard/*",
    element: <PrivateRoute element={<Dashboard />} />,
  },
].map(routes => ({
  ...routes,
  wrapper: DashboardWrapper,
}));
