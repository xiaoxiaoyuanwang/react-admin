import { COLLAPSED_FLAG } from "../actionTypes/layout";

const initState = {
  collapsed: false,
};
const layoutReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COLLAPSED_FLAG:
      return {
        ...state,
        collapsed: payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default layoutReducer;
