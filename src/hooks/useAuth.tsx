import axios from "axios";

import { useMutation } from "@tanstack/react-query";

interface IRegister {
  client_id: string;
  email: string;
  name: string;
}

const useAuth = () =>
  useMutation((loginData: IRegister) =>
    axios.post("https://api.supermetrics.com/assignment/register", loginData),
  );

export default useAuth;
