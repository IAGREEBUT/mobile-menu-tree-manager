import React from "react";
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
  key: string;
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

export default function MainPage() {
  const data = useSelector((state: RootState) => state.mainTrees.treeData);

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
          <TreeFilter menuInfoData={data} />
        </div>
        <div className="detail-view">
          <div className="detail-view-content" style={{ paddingBottom: 20 }}>
            <MenuInfoGrid selectedNode={selectNode} />
          </div>
          <div className="detail-view-conmment" style={{ paddingBottom: 20 }}>
            <CommentView key={"-1"} />
          </div>
          <div className="detail-view-history">
            <HistoryGrid key={"-1"} />
          </div>
        </div>
        {/* </div> */}
      </Container>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
