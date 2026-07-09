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
