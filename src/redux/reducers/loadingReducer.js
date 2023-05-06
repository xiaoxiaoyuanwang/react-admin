import { LOADING_FLAG } from "../actionTypes/loadingTypes";
const initState = {
  loading: false,
};
const loadingReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_FLAG:
      return {
        ...state,
        loading: payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default loadingReducer;
