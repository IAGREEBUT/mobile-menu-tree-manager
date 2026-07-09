import { NodeModel } from "../../types/TreeTypes";
import { CustomData } from "../../types/TreeTypes";
import menuInfoJson from "../../assets/menuInfo.mock.json";
import {
  EditMenuInfoJsonFile,
  parseEditMenuInfoJson,
} from "../util/editMenuParser";

// 액션 타입
const UPDATE = "trees/update" as const;

// 액션 생성 함수

export const update = (treeData: NodeModel<CustomData>[]) => ({
  type: UPDATE,
  payload: { treeData },
});

type TreeAction = ReturnType<typeof update>;

type TreeState = {
  treeData: NodeModel<CustomData>[];
};

// 초기상태를 선언
const initialTreeState: TreeState = {
  treeData: parseEditMenuInfoJson(menuInfoJson as EditMenuInfoJsonFile),
};

//한번에 한개만 수정 가능하다는 전재하에 짜여진 코드로 여러가지를 동시 수정이 불가능하게 막아둬야함

export default function trees(
  state: TreeState = initialTreeState,
  action: TreeAction
): TreeState {
  switch (action.type) {
    case UPDATE:
      return {
        treeData: action.payload.treeData,
      };
    default:
      return {
        ...state,
      };
  }
}

/*

react관리해야할 state들

modify mode를 켜는 경우에

modeType : ADD / DELETE / MODIFY / NONE + CANCEL에 대해서도 <- 모든걸 초기화해야함 
id : 어떤 것을 수정 중인지 ? ->
name : ADD, MODIFY시 name이 필수값이므로 


*/
