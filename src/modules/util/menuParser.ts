import type { menuInfo } from "../../types/dataTypes";

export type RawMenuItem = [
  id: string,
  path: string,
  name: string,
  icon: string,
  visible: number,
  type: number,
  permissionLevel: number,
  initialData: string,
  helpPath: string,
  shortcutName: string,
  hideShortcut: string,
  flags: string,
  searchName: string,
  externalPath: string,
  metadata: string,
  children: RawMenuItem[] | "" | []
];

export type MenuInfoJsonFile = {
  description: string[];
  property: string[];
  menus: RawMenuItem[];
};

const MENU_DESCRIPTION = [
  "Menu ID",
  "Screen path",
  "Menu name",
  "Icon name",
  "Visibility flag (0: hidden, 1: visible)",
  "Menu type (0: menu item, 1: submenu, 2: expanded menu)",
  "Permission level (0: public, 1: basic, 5: read-only, 6: admin)",
  "Initial screen data",
  "Help path",
  "Shortcut name",
  "Shortcut hidden flag (0: visible, 1: hidden)",
  "Menu flags",
  "Search Name",
  "External path",
  "Additional metadata",
  "Children",
];

const MENU_PROPERTY = [
  "id",
  "path",
  "name",
  "icon",
  "visible",
  "type",
  "permissionLevel",
  "initialData",
  "helpPath",
  "shortcutName",
  "hideShortcut",
  "flags",
  "searchName",
  "externalPath",
  "metadata",
  "children",
];

const ROOT_MENU_KEY = "0";

function isRawMenuChildren(
  value: RawMenuItem[] | "" | []
): value is RawMenuItem[] {
  return Array.isArray(value) && value.length > 0;
}

function createKey(counter: { value: number }): string {
  const key = String(counter.value);
  counter.value += 1;
  return key;
}

export function parseRawMenuItem(
  raw: RawMenuItem,
  counter: { value: number }
): menuInfo {
  const [
    id,
    path,
    name,
    icon,
    visible,
    type,
    permissionLevel,
    initialData,
    helpPath,
    shortcutName,
    hideShortcut,
    flags,
    searchName,
    externalPath,
    metadata,
    children,
  ] = raw;

  return {
    key: createKey(counter),
    id,
    path,
    name,
    icon,
    visible,
    type,
    permissionLevel,
    initialData,
    helpPath,
    shortcutName,
    hideShortcut,
    flags,
    searchName,
    externalPath,
    metadata,
    childInfo: isRawMenuChildren(children)
      ? children.map((child) => parseRawMenuItem(child, counter))
      : [],
  };
}

export function parseMenuInfoJson(menuInfoJson: MenuInfoJsonFile): menuInfo {
  const counter = { value: 1 };

  return {
    key: ROOT_MENU_KEY,
    name: "All Menus",
    icon: "",
    visible: -1,
    type: -1,
    permissionLevel: -1,
    searchName: "",
    id: "root",
    path: "",
    initialData: "",
    helpPath: "",
    shortcutName: "",
    hideShortcut: "",
    flags: "",
    externalPath: "",
    metadata: "",
    childInfo: menuInfoJson.menus.map((menu) =>
      parseRawMenuItem(menu, counter)
    ),
  };
}

export function getDescriptionWithoutChildren(
  menuInfoJson: MenuInfoJsonFile
): string[] {
  return menuInfoJson.description.slice(0, -1);
}

export function getPropertyWithoutChildren(
  menuInfoJson: MenuInfoJsonFile
): string[] {
  return menuInfoJson.property.slice(0, -1);
}

export function serializeMenuInfoNode(node: menuInfo): RawMenuItem {
  return [
    node.id ?? "",
    node.path ?? "",
    node.name ?? "",
    node.icon ?? "",
    node.visible ?? 0,
    node.type ?? 0,
    node.permissionLevel ?? 0,
    node.initialData ?? "",
    node.helpPath ?? "",
    node.shortcutName ?? "",
    String(node.hideShortcut ?? ""),
    node.flags ?? "",
    node.searchName ?? "",
    node.externalPath ?? "",
    node.metadata ?? "",
    node.childInfo && node.childInfo.length > 0
      ? node.childInfo.map((child) => serializeMenuInfoNode(child))
      : "",
  ];
}

export function createMenuInfoJsonFromTree(root: menuInfo): MenuInfoJsonFile {
  return {
    description: MENU_DESCRIPTION,
    property: MENU_PROPERTY,
    menus: root.childInfo?.map((child) => serializeMenuInfoNode(child)) ?? [],
  };
}

export function createMenuInfoTextFromTree(root: menuInfo): string {
  return JSON.stringify(createMenuInfoJsonFromTree(root), null, 2);
}

export function downloadMenuInfoJson(
  root: menuInfo,
  fileName = "menuInfo.exported.json"
): void {
  const text = createMenuInfoTextFromTree(root);
  const blob = new Blob([text], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
