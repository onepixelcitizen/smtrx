import { FC, PropsWithChildren } from "react";

import "./style.css";

const DashboardWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="dash-wrapper">{children}</div>;
};

export default DashboardWrapper;
