import { combineReducers } from "redux";
// 만들어낼 state의 action & reducer import
import trees from "./trees";
import mainTrees from "./mainTrees";
import comments from "./comments";
import history from "./history";

const rootReducer = combineReducers({
  // 추가하기
  trees,
  mainTrees,
  comments,
  history,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
