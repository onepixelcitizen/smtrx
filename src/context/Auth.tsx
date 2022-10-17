import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { getAuthToken } from "utils";

export enum ActionType {
  SET_AUTH = "SET_AUTH",
  SET_LOADING = "SET_LOADING",
}

interface IState {
  token?: string;
  isAuth: boolean;
  isLoading: boolean;
}

type IAction =
  | {
      type: ActionType.SET_AUTH;
      payload: Pick<IState, "isAuth">;
    }
  | {
      type: ActionType.SET_LOADING;
      payload: Pick<IState, "isLoading">;
    };

const initializeState = (token?: string): IState => ({
  token,
  isAuth: Boolean(token),
  isLoading: false,
});

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    case ActionType.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    default:
      return state;
  }
};

interface IAuthContextValue {
  state: IState;
  dispatch: Dispatch<IAction>;
}

const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    getAuthToken(),
    initializeState,
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): IAuthContextValue => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("You should use useAuthContext inside of an AuthProvider");
  }
  return authContextValue;
};

export { useAuthContext, AuthProvider };
