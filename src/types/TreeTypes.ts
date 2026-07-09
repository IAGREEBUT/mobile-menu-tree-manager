//editTree
export type CustomData = {
  order: number;
};

export type NodeModel<T = unknown> = {
  id: number | string;
  parent: number | string;
  text: string;
  droppable?: boolean | undefined;
  data?: T | undefined;
};

//mainTree
export type MainTreeNodeModel = {
  key: string;
  name?: string;
  icon?: string;
  visible?: number;
  type?: number;
  permissionLevel?: number;
  searchName?: string;
  childInfo?: MainTreeNodeModel[];
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
