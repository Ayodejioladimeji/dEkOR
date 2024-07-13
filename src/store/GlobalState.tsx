import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
  useState,
} from "react";
import reducers from "./Reducers";
import { ACTIONS } from "./Actions";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);

  const initialState = {
    toggle: false,
    cart: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      dispatch({ type: ACTIONS.SETCART, payload: JSON.parse(cartData) });
      dispatch({ type: ACTIONS.LOADING, payload: false });
    }
  }, []);

  // persists item in the cart
  useEffect(() => {
    if (state?.toggle) {
      localStorage.setItem("cart", JSON.stringify(state.cart));

      setTimeout(() => {
        dispatch({ type: ACTIONS.TOGGLE, payload: false });
      }, 50);
    }
  }, [state.cart, state?.toggle]);

  //

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
