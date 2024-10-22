import { ACTIONS } from "./Actions";

const reducers = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.TOGGLE:
      return {
        ...state,
        toggle: payload,
      };
    case ACTIONS.CART:
      return {
        ...state,
        cart: [payload, ...state.cart],
      };
    case ACTIONS.UPDATECART:
      return {
        ...state,
        cart: [...state.cart],
      };
    case ACTIONS.DELETECART:
      return {
        ...state,
        cart: payload,
      };
    case ACTIONS.SETCART:
      return {
        ...state,
        cart: payload,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: payload,
      };

    case ACTIONS.FAVOURITE:
      return {
        ...state,
        favourite: [payload, ...state.favourite],
      };
    case ACTIONS.UPDATEFAVOURITE:
      return {
        ...state,
        favourite: [...state.favourite],
      };

    case ACTIONS.DELETEFAVOURITE:
      return {
        ...state,
        favourite: payload,
      };

    case ACTIONS.SETFAVOURITE:
      return {
        ...state,
        favourite: payload,
      };

    case ACTIONS.CALLBACK:
      return {
        ...state,
        callback: payload,
      };

    default:
      return state;
  }
};

export default reducers;
