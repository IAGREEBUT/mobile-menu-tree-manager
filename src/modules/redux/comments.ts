import { comments } from "../../types/dataTypes";
import { getCurrentDateTimeText } from "../util/dataTime";

const ADD_COMMENT = "comments/addComment" as const;
const SET_COMMENTS = "comments/setComments" as const;
const RESET_COMMENTS = "comments/resetComments" as const;

export const addComment = (key: string, comment: string) => ({
  type: ADD_COMMENT,
  payload: { key, comment },
});

export const setComments = (commentData: comments) => ({
  type: SET_COMMENTS,
  payload: { commentData },
});

export const resetComments = () => ({
  type: RESET_COMMENTS,
});

type CommentsAction =
  | ReturnType<typeof addComment>
  | ReturnType<typeof setComments>
  | ReturnType<typeof resetComments>;

type CommentsState = {
  commentsByMenuKey: {
    [key: string]: comments;
  };
  // data examples ( "0" is the menu Key )
  //   const commentsByMenuKey = {
  //     "0": {
  //       key: "0",
  //       pageNum: 0,
  //       totalDataNum: 7,
  //       commentList: [...],
  //     },
  //     "3": {
  //       key: "3",
  //       pageNum: 0,
  //       totalDataNum: 1,
  //       commentList: [...],
  //     },
  //     "10": {
  //       key: "10",
  //       pageNum: 0,
  //       totalDataNum: 2,
  //       commentList: [...],
  //     },
  //   };
};

const initialCommentData: comments = {
  key: "0",
  pageNum: 0,
  totalDataNum: 7,
  commentList: [
    {
      id: 0,
      managerId: 1,
      createdTime: "2026-07-09 10:00",
      modifiedTime: "-",
      comments: "Review required before publishing this menu change.",
    },
    {
      id: 1,
      managerId: 2,
      createdTime: "2026-07-09 10:15",
      modifiedTime: "-",
      comments:
        "Please confirm whether this menu should remain visible to basic users.",
    },
    {
      id: 2,
      managerId: 3,
      createdTime: "2026-07-09 10:30",
      modifiedTime: "-",
      comments: "The display name has been updated for the rebuild demo.",
    },
    {
      id: 3,
      managerId: 1,
      createdTime: "2026-07-09 10:45",
      modifiedTime: "-",
      comments: "Check the drag-and-drop order before exporting the menu file.",
    },
    {
      id: 4,
      managerId: 2,
      createdTime: "2026-07-09 11:00",
      modifiedTime: "-",
      comments:
        "This is sample comment data stored in Redux for portfolio demonstration only.",
    },
    {
      id: 5,
      managerId: 3,
      createdTime: "2026-07-09 11:15",
      modifiedTime: "-",
      comments: "Backend persistence is not included in this rebuild version.",
    },
    {
      id: 6,
      managerId: 1,
      createdTime: "2026-07-09 11:30",
      modifiedTime: "-",
      comments:
        "Long comment sample.\nLine breaks are supported so reviewers can leave detailed notes about menu naming, visibility, permission level, or ordering changes.",
    },
  ],
};

const initialCommentsState: CommentsState = {
  commentsByMenuKey: {
    [initialCommentData.key]: initialCommentData,
  },
};

function createEmptyCommentData(key: string): comments {
  return {
    key,
    pageNum: 0,
    totalDataNum: 0,
    commentList: [],
  };
}

export default function commentsReducer(
  state: CommentsState = initialCommentsState,
  action: CommentsAction
): CommentsState {
  switch (action.type) {
    case ADD_COMMENT: {
      const { key, comment } = action.payload;
      const targetCommentData =
        state.commentsByMenuKey[key] ?? createEmptyCommentData(key);
      const nextCommentId = targetCommentData.commentList.length;

      return {
        ...state,
        commentsByMenuKey: {
          ...state.commentsByMenuKey,
          [key]: {
            ...targetCommentData,
            totalDataNum: targetCommentData.totalDataNum + 1,
            commentList: [
              ...targetCommentData.commentList,
              {
                id: nextCommentId,
                managerId: 0,
                createdTime: getCurrentDateTimeText(),
                modifiedTime: "-",
                comments: comment,
              },
            ],
          },
        },
      };
    }

    case SET_COMMENTS:
      return {
        ...state,
        commentsByMenuKey: {
          ...state.commentsByMenuKey,
          [action.payload.commentData.key]: {
            ...action.payload.commentData,
            commentList: action.payload.commentData.commentList.map(
              ({ attached, ...comment }) => comment
            ),
          },
        },
      };

    case RESET_COMMENTS:
      return initialCommentsState;

    default:
      return state;
  }
}
