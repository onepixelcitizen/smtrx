import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

import { ActionType, useAuthContext } from "context/Auth";
import { getAuthToken } from "utils";

const usePosts = (pageNumber: number) => {
  const { dispatch } = useAuthContext();

  return useQuery(
    ["assignment/posts", pageNumber],
    () =>
      axios.get(
        `https://api.supermetrics.com/assignment/posts?sl_token=${getAuthToken()}&page=${pageNumber}`,
      ),
    {
      keepPreviousData: true,
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          dispatch({ type: ActionType.SET_AUTH, payload: { isAuth: false } });
        }
        return console.error(error);
      },
    },
  );
};

export default usePosts;
