import { ACTIONS } from "./Actions";

const reducers = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.TOGGLE:
      return {
        ...state,
        toggle: payload,
      };

    default:
      return state;
  }
};

export default reducers;
