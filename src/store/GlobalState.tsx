import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { ACTIONS } from "./Actions";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const initialState = {
    toggle: false,
    cart: [],
    favourite: [],
    loading: true,
    callback: false,
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  // persits cart
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      dispatch({ type: ACTIONS.SETCART, payload: JSON.parse(cartData) });
    }
    dispatch({ type: ACTIONS.LOADING, payload: false });
  }, []);

  // persits favourites
  useEffect(() => {
    const data = localStorage.getItem("favourite");
    if (data) {
      dispatch({ type: ACTIONS.SETFAVOURITE, payload: JSON.parse(data) });
    }
    dispatch({ type: ACTIONS.LOADING, payload: false });
  }, []);

  // persists item in the cart
  useEffect(() => {
    if (state?.toggle) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("favourite", JSON.stringify(state.favourite));

      setTimeout(() => {
        dispatch({ type: ACTIONS.TOGGLE, payload: false });
      }, 50);
    }
  }, [state?.favourite, state.cart, state?.toggle]);

  //

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
