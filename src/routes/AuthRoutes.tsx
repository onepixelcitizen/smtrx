import { Login } from "pages";

import { AuthWrapper } from "components";

export default [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/supermetrics",
    element: <p>Yes we are awesome 😜</p>,
  },
].map(routes => ({
  ...routes,
  wrapper: AuthWrapper,
}));
