import React from "react";
import { TextField } from "@mui/material";
import { uniq } from "lodash";
import MenuTreeView from "./MenuTreeView";
import {
  filterTree,
  expandFilteredNodes,
  getIDsExpandFilter,
} from "./util/filterTreeUtil";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { MAINBLUE } from "../../../types/colorCode";
import { useNavigate } from "react-router-dom";
import { TreeFilterProps } from "..";
import { menuInfo } from "../../../types/dataTypes";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";

//MenuTree의 Props
export type MenuTreeProps = {
  data: menuInfo;
  expanded: string[];
  selected: string[];
  handleToggle: (event: any, nodeIds: string[]) => void;
  handleSelect: (event: any, nodeIds: string[]) => void;
};

const TreeFilter = ({ menuInfoData, onSelectNode }: TreeFilterProps) => {
  const navigate = useNavigate();

  //검색 관련
  const [expanded, setExpanded] = useState<string[]>(["0"]); //expand list
  const [selected, setSelected] = useState<string[]>([]);
  const [subjectData, setSubjectData] = useState<menuInfo>(); //현재 펼쳐진 요소들(expanded list는 키만있고 여기에는 모든 요소)
  const [selectedSingleItem, setSelectedSingleItem] = useState<string>("");

  useEffect(() => {
    setSubjectData(() => menuInfoData);

    //menuInfoData가 값으로 전달되기 전까지는 undefine이라 에러
    if (menuInfoData) {
      getNodeLists(menuInfoData);
    }
  }, [menuInfoData]);

  //검색어 입력시 실행
  const onFilterMouseUp = (e: any) => {
    //검색어
    const value: string = e.target.value;
    const filter: string = value.replaceAll(" ", ""); //공백 제거 .trim()이 안먹혀서 replaceAll

    //expend할 key값 list
    let expandedTemp = expanded;

    if (!filter) {
      //검색어 없는 경우 => 초기화
      setSubjectData(() => menuInfoData); // 데이터 초기화
      setExpanded(["0"]); //펼칠 key는 root key만
      return;
    }

    let filtered = filterTree(menuInfoData, filter); // (모든 데이터, 검색어)를 이용해 검색어가 존재하는 노드들만 반환
    filtered = expandFilteredNodes(filtered, filter); // 해당 노드들 중 expand되어야 하는 노드들 및 그의 자식노드들을 알려줌
    if (filtered && filtered.childInfo) {
      expandedTemp = [];
      expandedTemp.push(...getIDsExpandFilter(filtered)); //expand를 위해 해당 노드들의 key값을 모아줌
    }
    setExpanded(uniq(expandedTemp)); //expand할 list를 set up
    setSubjectData(filtered); //펼쳐진 요소들 리스트
  };

  const handleToggle = (event: any, nodeIds: string[]) => {
    if (event.target.closest(".MuiTreeItem-iconContainer")) {
      //icon 영역을 click할 때만 펼쳐지게
      let expandedTemp = expanded;
      expandedTemp = nodeIds;
      setExpanded(expandedTemp);
    }
  };

  const handleSelect = (event: any, nodeIds: string[]) => {
    setSelected(nodeIds);
    onSelectNode?.(nodeIds[0]);
    // When false (default) is a string this takes single string.
    if (!Array.isArray(nodeIds)) {
      setSelectedSingleItem(nodeIds);
    }
    // TODO: When `multiSelect` is true this takes an array of strings
  };

  const [nodelists, setNodelists] = React.useState<string[]>([]);
  const [allExpand, setAllExpand] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setAllExpand(!allExpand);

    // setExpanded((oldExpanded) =>
    //     oldExpanded.length === 1 ? nodelists : ["0"],
    // );
  };

  useEffect(() => {
    if (allExpand) {
      setExpanded(nodelists);
    } else {
      setExpanded(["0"]);
    }
  }, [allExpand]);

  //트리뷰를 전부 펴기위해 사용되는 key값 리스트를 만드는 함수
  const getNodeLists = (nodes: menuInfo) => {
    if (Array.isArray(nodes.childInfo)) {
      nodelists.push(nodes.key);
      nodes.childInfo.map((node) => getNodeLists(node));
    } else {
      nodelists.push(nodes.key);
    }
  };

  //스위치
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  return (
    <div>
      <Box sx={{ padding: 1, display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", paddingRight: 1 }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            variant="standard"
            onKeyUp={onFilterMouseUp}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: MAINBLUE, minWidth: "50px" }}
            onClick={() => {
              navigate("/edit");
              window.location.reload();
            }}
          >
            {"편집하기"}
          </Button>
          <Switch {...label} onChange={handleExpandClick} />
        </Box>
      </Box>
      <Box>
        <MenuTreeView
          data={subjectData!}
          expanded={expanded}
          selected={selected}
          handleToggle={handleToggle}
          handleSelect={handleSelect}
          // onSelectNode={onSelectNode}
        />
      </Box>
    </div>
  );
};

export default TreeFilter;
