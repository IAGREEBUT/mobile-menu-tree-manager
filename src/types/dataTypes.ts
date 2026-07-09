export type menuInfo = {
  key: string;
  name?: string;
  icon?: string;
  visible?: number;
  type?: number;
  permissionLevel?: number;
  searchName?: string;
  childInfo?: menuInfo[];
  // status?: number;

  id?: string;
  path?: string;
  initialData?: string;
  helpPath?: string;
  shortcutName?: string;
  hideShortcut?: string;
  flags?: string;
  externalPath?: string;
  metadata?: string;
};

export type menuInfoDetail = {
  key: string;
  id?: string;
  path?: string;
  name?: string;
  icon?: string;
  visible?: number;
  type?: number;
  permissionLevel?: number;
  initialData?: string;
  helpPath?: string;
  shortcutName?: string;
  hideShortcut?: string;
  flags?: string;
  searchName?: string;
  externalPath?: string;
  metadata?: string;
  // status?: number;
};

export type menuEditInfo = {
  key: string;
  name?: string;
  childInfo?: menuEditInfo[];
};

//
export type menuEdit = {
  key: string;
  name?: string;
  status?: string; //0:신규 / 1:수정 / 2:완료 / 3:삭제된 메뉴
};

//HistoryGrid
export type menuHistory = {
  key: string; //어떤 메뉴인포에 대한 히스토리인지
  pageNum: number;
  totalDataNum: number;
  historyList: historyDetail[];
};

export type historyDetail = {
  id: number;
  timestamp: string; //변경 일자 -> js에서는 db에서오는 날짜를 string으로 받아야한다고 함..(?)
  manager: managerInfo;
  changedProperty: string;
  before: string;
  after: string;
};

export type managerInfo = {
  //id배고 없는거 "-" 로 처리
  id: number;
  name: string;
  mId: string; //사번
  email?: string;
};

//CommentView
export type comments = {
  //id배고 없는거 "-" 로 처리
  key: string; //어떤 key에 해당하는 comment들인가
  pageNum: number; // 페이징 처리를 위한 값
  totalDataNum: number;
  commentList: commentDetail[];
};

export type commentDetail = {
  id: number;
  manager: managerInfo; //누가썼는지
  createdTime: string; //없으면 -
  modifiedTime: string; // 없으면 -
  comments?: string; //없으면 "" <-이거
  attached?: any[]; //파일 여러개일 수도... // 없으면 빈칸 + 엔터도 저장해서 보내줘야..함??엔터가반영되게
};
