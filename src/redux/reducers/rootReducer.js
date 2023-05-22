import loadingReducer from "./loadingReducer";
import layoutReducer from "./layout";
const rootReducer = {
  loadingStore: loadingReducer,
  layoutStore: layoutReducer,
};
export default rootReducer;
