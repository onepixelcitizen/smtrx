import { FC, PropsWithChildren } from "react";

import "./style.css";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="auth-wrapper">{children}</div>;
};

export default AuthWrapper;
