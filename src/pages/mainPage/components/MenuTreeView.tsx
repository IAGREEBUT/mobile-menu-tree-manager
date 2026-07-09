import React from "react";
import TreeView from "@mui/lab/TreeView";
import MuiTreeItem from "@mui/lab/TreeItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
  treeItemClasses,
} from "@mui/lab/TreeItem";

import { MenuTreeProps } from "./TreeFilter";
import { menuInfo } from "../../../types/dataTypes";
import { useEffect } from "react";
import StyledTreeItem from "./StyledTreeItem";
/*

tree view with searching
https://mohammad-hassan-fallah.medium.com/react-tree-component-with-filter-f1d052c5d11d

*/

const MenuTreeView = ({
  data,
  expanded,
  selected,
  handleToggle,
  handleSelect,
}: MenuTreeProps) => {
  const renderTree = (
    nodes: menuInfo = {
      //default값
      key: "-1",
      name: "-",
      icon: "-",
      visible: -1,
      type: -1,
      permissionLevel: -1,
      searchName: "-",
      childInfo: [],
    }
  ) => {
    return (
      <StyledTreeItem
        key={nodes.key}
        nodeId={nodes.key}
        labelText={nodes.name!}
      >
        {Array.isArray(nodes.childInfo)
          ? nodes.childInfo.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      defaultExpanded={["0"]}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default MenuTreeView;
