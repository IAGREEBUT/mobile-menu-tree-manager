import React, { useMemo, useState } from "react";
import { menuInfo } from "../../types/dataTypes";
import TreeFilter from "./components/TreeFilter";
import "./styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { menuInfoDetail } from "../../types/dataTypes";
import MenuInfoGrid from "./components/MenuDetailGrid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import HistoryGrid from "./components/HistoryGrid";
import CommentView from "./components/CommentView";
import GmailTreeView from "./components/StyledTreeItem";
import { useSelector } from "react-redux";

//TreeFilter로 넘기는 Props
export type TreeFilterProps = {
  menuInfoData?: menuInfo;
  onSelectNode?: (key: string) => void;
};

type RootState = {
  mainTrees: {
    treeData: TreeFilterProps["menuInfoData"];
  };
};

//https://mohammad-hassan-fallah.medium.com/react-tree-component-with-filter-f1d052c5d11d

export type MenuGridInfoProps = {
  selectedNode: menuInfoDetail;
  // tooltips: string[];
  // description: string[];
};

//History 로 넘기는 Props
export type HistoryProps = {
  key: string;
};

//CommentPage 로 넘기는 Props
export type CommentProps = {
  menuKey: string;
};

const selectNode: menuInfoDetail = {
  key: "key",
  id: "id",
  path: "path",
  name: "name",
  icon: "icon",
  visible: -1,
  type: -1,
  permissionLevel: -1,
  initialData: "initialData",
  helpPath: "helpPath",
  shortcutName: "shortcutName",
  hideShortcut: "hideShortcut",
  flags: "flags",
  searchName: "searchName",
  externalPath: "externalPath",
  metadata: "metadata",
};

function findMenuNodeByKey(
  node: menuInfo | undefined,
  key: string | null
): menuInfoDetail | null {
  if (!node || !key) {
    return null;
  }

  if (node.key === key) {
    return {
      key: node.key,
      id: node.id ?? "",
      path: node.path ?? "",
      name: node.name ?? "",
      icon: node.icon ?? "",
      visible: node.visible ?? -1,
      type: node.type ?? -1,
      permissionLevel: node.permissionLevel ?? -1,
      initialData: node.initialData ?? "",
      helpPath: node.helpPath ?? "",
      shortcutName: node.shortcutName ?? "",
      hideShortcut: String(node.hideShortcut ?? ""),
      flags: node.flags ?? "",
      searchName: node.searchName ?? "",
      externalPath: node.externalPath ?? "",
      metadata: node.metadata ?? "",
    };
  }

  for (const child of node.childInfo ?? []) {
    const found = findMenuNodeByKey(child, key);
    if (found) {
      return found;
    }
  }

  return null;
}

export default function MainPage() {
  const data = useSelector((state: RootState) => state.mainTrees.treeData);

  const [selectedKey, setSelectedKey] = useState<string | null>("0");

  const selectedNode = useMemo(
    () => findMenuNodeByKey(data, selectedKey) ?? selectNode,
    [data, selectedKey]
  );

  return (
    <div className="main-container">
      <div className="start">
        <Header />
      </div>
      <Container
        component={Paper}
        className="main-content"
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
      >
        <div className="sidebar">
          <TreeFilter menuInfoData={data} onSelectNode={setSelectedKey} />
        </div>
        <div className="detail-view">
          <div className="detail-view-content" style={{ paddingBottom: 20 }}>
            <MenuInfoGrid selectedNode={selectedNode} />
          </div>
          <div className="detail-view-conmment" style={{ paddingBottom: 20 }}>
            <CommentView menuKey={selectedKey ?? "1"} />
          </div>
          <div className="detail-view-history">
            <HistoryGrid key={"-1"} />
          </div>
        </div>
      </Container>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
