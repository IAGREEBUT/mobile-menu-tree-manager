import { menuHistory } from "../../types/dataTypes";
import { getCurrentDateTimeText } from "../util/dataTime";

const ADD_HISTORY = "history/addHistory" as const;
const SET_HISTORY = "history/setHistory" as const;
const RESET_HISTORY = "history/resetHistory" as const;

export const addHistory = (
  key: string,
  changeProperty: string,
  before: string,
  after: string
) => ({
  type: ADD_HISTORY,
  payload: { key, changeProperty, before, after },
});

export const setHistory = (historyData: menuHistory) => ({
  type: SET_HISTORY,
  payload: { historyData },
});

export const resetHistory = () => ({
  type: RESET_HISTORY,
});

type HistoryAction =
  | ReturnType<typeof addHistory>
  | ReturnType<typeof setHistory>
  | ReturnType<typeof resetHistory>;

type HistoryState = {
  historyByMenuKey: {
    [key: string]: menuHistory;
  };
};

const initialHistoryData: menuHistory = {
  key: "0",
  pageNum: 0,
  totalDataNum: 15,
  historyList: [
    {
      id: 0,
      timestamp: "2026-07-08 08:25",
      managerId: 1,
      changedProperty: "initialData",
      before: "",
      after: '{"entryPoint":"account"}',
    },
    {
      id: 1,
      timestamp: "2026-07-08 08:40",
      managerId: 2,
      changedProperty: "helpPath",
      before: "",
      after: "/help/account-opening",
    },
    {
      id: 2,
      timestamp: "2026-07-08 08:55",
      managerId: 3,
      changedProperty: "flags",
      before: "beta",
      after: "stable",
    },
    {
      id: 3,
      timestamp: "2026-07-08 09:10",
      managerId: 1,
      changedProperty: "externalPath",
      before: "",
      after: "https://example.com/account-guide",
    },
    {
      id: 4,
      timestamp: "2026-07-08 09:25",
      managerId: 2,
      changedProperty: "permissionLevel",
      before: "6",
      after: "1",
    },
    {
      id: 5,
      timestamp: "2026-07-08 09:40",
      managerId: 3,
      changedProperty: "initialData",
      before: "",
      after: '{"entryPoint":"account"}',
    },
    {
      id: 6,
      timestamp: "2026-07-08 09:55",
      managerId: 1,
      changedProperty: "helpPath",
      before: "",
      after: "/help/account-opening",
    },
    {
      id: 7,
      timestamp: "2026-07-08 10:10",
      managerId: 2,
      changedProperty: "flags",
      before: "beta",
      after: "stable",
    },
    {
      id: 8,
      timestamp: "2026-07-08 10:25",
      managerId: 3,
      changedProperty: "externalPath",
      before: "",
      after: "https://example.com/account-guide",
    },
    {
      id: 9,
      timestamp: "2026-07-08 10:40",
      managerId: 1,
      changedProperty: "permissionLevel",
      before: "6",
      after: "1",
    },
    {
      id: 10,
      timestamp: "2026-07-09 12:04",
      managerId: 2,
      changedProperty: "initialData",
      before: "",
      after: '{"entryPoint":"account"}',
    },
    {
      id: 11,
      timestamp: "2026-07-09 12:18",
      managerId: 3,
      changedProperty: "helpPath",
      before: "",
      after: "/help/account-opening",
    },
    {
      id: 12,
      timestamp: "2026-07-09 12:31",
      managerId: 1,
      changedProperty: "flags",
      before: "beta",
      after: "stable",
    },
    {
      id: 13,
      timestamp: "2026-07-09 12:47",
      managerId: 2,
      changedProperty: "externalPath",
      before: "",
      after: "https://example.com/account-guide",
    },
    {
      id: 14,
      timestamp: "2026-07-09 13:05",
      managerId: 3,
      changedProperty: "permissionLevel",
      before: "6",
      after: "1",
    },
  ],
};

const initialHistoryState: HistoryState = {
  historyByMenuKey: {
    [initialHistoryData.key]: initialHistoryData,
  },
};

function createEmptyHistoryData(key: string): menuHistory {
  return {
    key,
    pageNum: 0,
    totalDataNum: 10,
    historyList: [],
  };
}

export default function historyReducer(
  state: HistoryState = initialHistoryState,
  action: HistoryAction
): HistoryState {
  switch (action.type) {
    case ADD_HISTORY: {
      const { key, changeProperty, before, after } = action.payload;
      const targetHistoryData =
        state.historyByMenuKey[key] ?? createEmptyHistoryData(key);
      const nextHistoryId = targetHistoryData.historyList.length;

      return {
        ...state,
        historyByMenuKey: {
          ...state.historyByMenuKey,
          [key]: {
            ...targetHistoryData,
            totalDataNum: targetHistoryData.totalDataNum + 1,
            historyList: [
              ...targetHistoryData.historyList,
              {
                id: nextHistoryId,
                timestamp: getCurrentDateTimeText(),
                managerId: 0,
                changedProperty: changeProperty,
                before: before,
                after: after,
              },
            ],
          },
        },
      };
    }

    case SET_HISTORY: {
      return {
        ...state,
        historyByMenuKey: {
          ...state.historyByMenuKey,
          [action.payload.historyData.key]: {
            ...action.payload.historyData,
            historyList: action.payload.historyData.historyList.map(
              ({ ...history }) => history
            ),
          },
        },
      };
    }

    case RESET_HISTORY:
      return initialHistoryState;

    default:
      return state;
  }
}
