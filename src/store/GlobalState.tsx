import { createContext, useReducer, ReactNode, Dispatch } from "react";
import reducers from "./Reducers";

type StateType = {
  toggle: boolean;
  cart: any;
};

type ActionType = { type: string };
type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

export const DataContext = createContext<ContextType | null>(null);

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = {
    toggle: false,
    cart: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
