import { createContext, useReducer, ReactNode, Dispatch } from "react";
import reducers from "./Reducers";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
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
