import { NodeModel } from "../../types/TreeTypes";
import { CustomData } from "../../types/TreeTypes";

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
  treeData: [
    {
      id: 3,
      parent: 0,
      droppable: true,
      text: "Dashboard",
      data: {
        order: 3,
      },
    },
    {
      id: 1,
      parent: 0,
      droppable: true,
      text: "준비하기",
      data: {
        order: 1,
      },
    },
    {
      id: 2,
      parent: 0,
      droppable: true,
      text: "투자하기",
      data: {
        order: 2,
      },
    },
    {
      id: 4,
      parent: 0,
      droppable: true,
      text: "숨김메뉴",
      data: {
        order: 4,
      },
    },
    {
      id: 5,
      parent: 1,
      droppable: true,
      text: "계좌개설",
      data: {
        order: 1,
      },
    },
    {
      id: 6,
      parent: 5,
      droppable: true,
      text: "개인",
      data: {
        order: 1,
      },
    },
    {
      id: 7,
      parent: 6,
      droppable: false,
      text: "개인계좌개설",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 1,
      },
    },
    {
      id: 8,
      parent: 6,
      droppable: false,
      text: "개인 신청현황 조회/취소",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 2,
      },
    },
    {
      id: 9,
      parent: 2,
      droppable: true,
      text: "주식",
      data: {
        order: 1,
      },
    },
    {
      id: 10,
      parent: 9,
      droppable: true,
      text: "국내주식",
      data: {
        order: 1,
      },
    },
    {
      id: 11,
      parent: 10,
      droppable: true,
      text: "국내주식잔고",
      data: {
        order: 2,
      },
    },
    {
      id: 12,
      parent: 10,
      droppable: true,
      text: "주식거래내역",
      data: {
        order: 3,
      },
    },
    {
      id: 13,
      parent: 10,
      droppable: false,
      text: "관심종목5",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 1,
      },
    },
    {
      id: 14,
      parent: 11,
      droppable: false,
      text: "주식잔고",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 1,
      },
    },
    {
      id: 15,
      parent: 12,
      droppable: false,
      text: "거래내역",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 1,
      },
    },
    {
      id: 16,
      parent: 12,
      droppable: false,
      text: "주식매매일지2",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 2,
      },
    },
    {
      id: 17,
      parent: 12,
      droppable: false,
      text: "주식 체결/미체결",
      data: {
        // "fileType": "image",
        // "fileSize": "0.8MB",
        order: 3,
      },
    },
  ],
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
