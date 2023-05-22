import { COLLAPSED_FLAG } from "../actionTypes/layout";
export const collpsedActions = (payload) => {
  return {
    type: COLLAPSED_FLAG,
    payload,
  };
};
