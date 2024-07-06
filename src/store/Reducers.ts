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
        cart: [payload, ...state?.cart],
      };

    default:
      return state;
  }
};

export default reducers;
