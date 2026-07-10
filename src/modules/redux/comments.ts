import { comments } from "../../types/dataTypes";

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
      manager: {
        id: 1,
        mId: "DEMO001",
        name: "Demo Admin",
        email: "demo.admin@example.com",
      },
      createdTime: "2026-07-09 10:00",
      modifiedTime: "-",
      comments: "Review required before publishing this menu change.",
    },
    {
      id: 1,
      manager: {
        id: 2,
        mId: "DEMO002",
        name: "Product Manager",
        email: "product.manager@example.com",
      },
      createdTime: "2026-07-09 10:15",
      modifiedTime: "-",
      comments:
        "Please confirm whether this menu should remain visible to basic users.",
    },
    {
      id: 2,
      manager: {
        id: 3,
        mId: "DEMO003",
        name: "Frontend Developer",
        email: "frontend.dev@example.com",
      },
      createdTime: "2026-07-09 10:30",
      modifiedTime: "-",
      comments: "The display name has been updated for the rebuild demo.",
    },
    {
      id: 3,
      manager: {
        id: 1,
        mId: "DEMO001",
        name: "Demo Admin",
        email: "demo.admin@example.com",
      },
      createdTime: "2026-07-09 10:45",
      modifiedTime: "-",
      comments: "Check the drag-and-drop order before exporting the menu file.",
    },
    {
      id: 4,
      manager: {
        id: 2,
        mId: "DEMO002",
        name: "Product Manager",
        email: "product.manager@example.com",
      },
      createdTime: "2026-07-09 11:00",
      modifiedTime: "-",
      comments:
        "This is sample comment data stored in Redux for portfolio demonstration only.",
    },
    {
      id: 5,
      manager: {
        id: 3,
        mId: "DEMO003",
        name: "Frontend Developer",
        email: "frontend.dev@example.com",
      },
      createdTime: "2026-07-09 11:15",
      modifiedTime: "-",
      comments: "Backend persistence is not included in this rebuild version.",
    },
    {
      id: 6,
      manager: {
        id: 1,
        mId: "DEMO001",
        name: "Demo Admin",
        email: "demo.admin@example.com",
      },
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

function getCurrentDateTimeText(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

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
                manager: {
                  id: 0,
                  mId: "DEMO_USER",
                  name: "Demo User",
                  email: "demo.user@example.com",
                },
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
