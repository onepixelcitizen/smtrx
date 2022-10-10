import { FC } from "react";

import "./style.css";

interface ILoader {}

const Loader: FC<ILoader> = () => {
  return <div className="loader" />;
};

export default Loader;
