import menuInfoJson from "../../assets/menuInfo.mock.json";
import { MainTreeNodeModel } from "../../types/TreeTypes";
import { parseMenuInfoJson, MenuInfoJsonFile } from "../util/menuParser";
import { menuInfo } from "../../types/dataTypes";

const UPDATE_MAIN_TREE = "mainTrees/updateMainTree" as const;
const UPDATE_MAIN_TREE_NODE = "mainTrees/updateMainTreeNode" as const;
const RESET_MAIN_TREE = "mainTrees/resetMainTree" as const;
const SELECT_MAIN_TREE_NODE = "mainTrees/selectMainTreeNode" as const;

const parsedInitialTree = parseMenuInfoJson(menuInfoJson as MenuInfoJsonFile);

export const updateMainTree = (treeData: MainTreeNodeModel) => ({
  type: UPDATE_MAIN_TREE,
  payload: { treeData },
});

export const updateMainTreeNode = (
  key: string,
  changes: Partial<MainTreeNodeModel>
) => ({
  type: UPDATE_MAIN_TREE_NODE,
  payload: { key, changes },
});

export const resetMainTree = () => ({
  type: RESET_MAIN_TREE,
});

export const selectMainTreeNode = (key: string | null) => ({
  type: SELECT_MAIN_TREE_NODE,
  payload: { key },
});

type MainTreeAction =
  | ReturnType<typeof updateMainTree>
  | ReturnType<typeof updateMainTreeNode>
  | ReturnType<typeof resetMainTree>
  | ReturnType<typeof selectMainTreeNode>;

type MainTreeState = {
  treeData: MainTreeNodeModel;
  selectedKey: string | null;
};

const initialMainTreeState: MainTreeState = {
  treeData: parsedInitialTree as MainTreeNodeModel,
  selectedKey: null,
};

function updateNodeByKey(
  node: MainTreeNodeModel,
  key: string,
  changes: Partial<MainTreeNodeModel>
): MainTreeNodeModel {
  if (node.key === key) {
    return {
      ...node,
      ...changes,
    };
  }

  return {
    ...node,
    childInfo: node.childInfo?.map((child) =>
      updateNodeByKey(child as MainTreeNodeModel, key, changes)
    ),
  };
}

export function getInitialMainTree(): MainTreeNodeModel {
  return parseMenuInfoJson(
    menuInfoJson as MenuInfoJsonFile
  ) as MainTreeNodeModel;
}

export default function mainTrees(
  state: MainTreeState = initialMainTreeState,
  action: MainTreeAction
): MainTreeState {
  switch (action.type) {
    case UPDATE_MAIN_TREE:
      return {
        ...state,
        treeData: action.payload.treeData,
      };

    case UPDATE_MAIN_TREE_NODE:
      return {
        ...state,
        treeData: updateNodeByKey(
          state.treeData,
          action.payload.key,
          action.payload.changes
        ),
      };

    case RESET_MAIN_TREE:
      return {
        treeData: getInitialMainTree(),
        selectedKey: null,
      };

    case SELECT_MAIN_TREE_NODE:
      return {
        ...state,
        selectedKey: action.payload.key,
      };

    default:
      return state;
  }
}
