import { LOADING_FLAG } from "../actionTypes/loadingTypes";
export const loadingActions = (payload) => {
  return {
    type: LOADING_FLAG,
    payload,
  };
};
