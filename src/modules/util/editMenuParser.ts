import type { NodeModel, CustomData } from "../../types/TreeTypes";

export type RawEditMenuItem = [
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
  hideShortcut: string | number,
  flags: string,
  searchName: string,
  externalPath: string,
  metadata: string,
  children: RawEditMenuItem[] | "" | []
];

export type EditMenuInfoJsonFile = {
  description: string[];
  property: string[];
  menus: RawEditMenuItem[];
};

function hasChildren(
  value: RawEditMenuItem[] | "" | []
): value is RawEditMenuItem[] {
  return Array.isArray(value) && value.length > 0;
}

function createNodeId(counter: { value: number }): number {
  const id = counter.value;
  counter.value += 1;
  return id;
}

export function parseEditMenuInfoJson(
  menuInfoJson: EditMenuInfoJsonFile
): NodeModel<CustomData>[] {
  const result: NodeModel<CustomData>[] = [];
  const counter = { value: 1 };

  function parseMenus(rawMenus: RawEditMenuItem[], parentId: number): void {
    rawMenus.forEach((rawMenu, index) => {
      const [
        _menuId,
        _path,
        name,
        _icon,
        _visible,
        _type,
        _permissionLevel,
        _initialData,
        _helpPath,
        _shortcutName,
        _hideShortcut,
        _flags,
        _searchName,
        _externalPath,
        _metadata,
        children,
      ] = rawMenu;

      const nodeId = createNodeId(counter);

      result.push({
        id: nodeId,
        parent: parentId,
        droppable: _type !== 0,
        text: name,
        data: {
          order: index + 1,
        },
      });

      if (hasChildren(children)) {
        parseMenus(children, nodeId);
      }
    });
  }

  parseMenus(menuInfoJson.menus, 0);

  return result;
}
