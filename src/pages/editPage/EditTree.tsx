import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Tree,
  // NodeModel,
  TreeMethods,
  DropOptions,
  MultiBackend,
  getDescendants,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { CustomData } from "../../types/TreeTypes";
import { CustomNode } from "./components/CustomNode";
import { theme } from "./components/styles/theme";
import { Placeholder } from "./components/Placeholder";
import styles from "./editview.module.css";
// import SampleData from "./sample_data.json";
import { CustomDragPreview } from "./components/CustomDragPreview";
import { AddDialog } from "./components/AddDialog";
import { NodeModel } from "../../types/TreeTypes";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../modules/redux/trees";
import { RootState } from "../../modules/redux";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const getLastId = (treeData: NodeModel[]): number => {
  const reversedArray: NodeModel[] = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  let res = reversedArray[0].id;
  if (typeof res === "string") return parseInt(res);
  else {
    return res;
  }

  return 0;
};

function EditView() {
  const treeData: NodeModel<CustomData>[] = useSelector(
    (state: RootState) => state.trees.treeData
  );
  // const [treeData, setTreeData] = useState<NodeModel<CustomData>[]>(SampleData);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  const navigate = useNavigate();

  // useEffect(() => {
  //   setTreeData(SampleData)
  // }, [SampleData]);

  const handleDrop = (
    newTree: NodeModel<CustomData>[],
    options: DropOptions
  ) => {
    const {
      dragSourceId,
      dropTargetId,
      dragSource,
      dropTarget,
      destinationIndex,
      relativeIndex,
    } = options;
    /*
        dragSourceId : 드래그 당하는 노드의 아이디
        dropTargetId : 드롭한 위치의 노드 아이디
        dragSource : 드래그 당한 노드
        dropTarget: 드롭당한 노드 
      */

    // console.log("==================================================");
    // console.log("source : " + dragSourceId);
    // console.log("source parent " + dragSource?.parent);
    // console.log("dest parent: " + dropTargetId);
    // console.log("destinationIndex : " + destinationIndex);
    // console.log("relativeIndex : " + relativeIndex);

    /*
        1. data.order대로 정렬한다 (sort에 order함수 사용)
        -> 프론트에서 오더를 변경하지 않기때문에 드롭해도 위치가 변경되지 않는다
        하지만 어쩌피 API에서 돌아오면 순서가 변경된 새로운 데이터가 오기 때문에 

        axios.답변이 오기까지 loading을 보여준 후 바꾸면될 것 같긴함

        or 
        프론트 자체에서 data.order를 변경해야함 드롭할때...

        1. dragSourceId : 본인의 key 
        2. dragSource?.parent : 오리지널 부모의 key
        3. dropTargetId : 새로바뀐 부모의 key
        4. relativeIndex : 내부에서의 오더 
        로 주면될듯 

      */

    /*
        sibiling 간의 이동인 경우(단순 순서변경)
         - dargSource.parent === dropTargetId // 변경전 부모와 변경후 타겟 아이디(부모로나옴..)이 같다 
         -> 해당 부모(parent id같이 보내서) 아래 있는 모든 자식들을 순서대로 보내준다 -> 이부분만 update (현재 최대 16개 -> 준비하기 > 서비스신청 > 해외매매서비스 신청)

        parent를 변경하는 경우
         - dargSource.parent !== dropTargetId // 변경전 부모와 변경후 타겟 아이디가 다르다 
         -> 변경된 부모아이디와 / 변경한 소스아이디를 전달한다.. 
        
      */

    dispatch(update(newTree));
  };

  const handleTextChange = (id: NodeModel["id"], value: string) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value,
        };
      }

      return node;
    });

    //dispatch
    dispatch(update(newTree));
  };

  //add & remove   const handleOpenDialog = () => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  //삭제로직
  const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id),
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    //여기서 axios로 삭제를 보내고 성공이 날아오면 newTree를 setTreeData에 반영
    //fail날아오면 오류 메세지 표시하고 setTreeData에 반영하지 않음

    dispatch(update(newTree));
    // setTreeData(newTree);
  };

  const handleOpenDialog = () => {
    setOpenAdd(true);
  };

  const handleCloseDialog = () => {
    setOpenAdd(false);
  };

  //생성시 ..
  const handleAddSubmit = (newNode: Omit<NodeModel<CustomData>, "id">) => {
    const lastId = getLastId(treeData) + 1;

    dispatch(
      update([
        ...treeData,
        {
          ...newNode,
          id: lastId,
        },
      ])
    );
    // setTreeData([
    //   ...treeData,
    //   {
    //     ...newNode,
    //     id: lastId,
    //   }
    // ]);
  };

  const ref = useRef<TreeMethods>(null);

  const handleOpenAll = () => ref.current?.openAll();
  const handleCloseAll = () => ref.current?.closeAll();

  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const handleToggleAllExpanded = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setIsAllExpanded(checked);

    if (checked) {
      handleOpenAll();
    } else {
      handleCloseAll();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.editView}>
          <div
            className={styles.actions}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "14px 16px",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAllExpanded}
                    onChange={handleToggleAllExpanded}
                    color="primary"
                    inputProps={{ "aria-label": "toggle expand all menus" }}
                  />
                }
                label={isAllExpanded ? "Collapse All" : "Expand All"}
                sx={{
                  marginLeft: 0,
                  color: "#374151",
                  "& .MuiFormControlLabel-label": {
                    fontSize: 14,
                    fontWeight: 700,
                  },
                }}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
              sx={{
                px: 2.5,
                textTransform: "none",
              }}
            >
              APPLY CHANGES
            </Button>
          </div>
          <Tree
            ref={ref}
            tree={treeData}
            rootId={0}
            render={(
              node: NodeModel<CustomData>,
              { depth, isOpen, onToggle }
            ) => (
              <CustomNode
                node={node}
                onDelete={handleDelete} //add & remove
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
                onTextChange={handleTextChange}
                onOpenAddDialog={handleOpenDialog}
                onAddSubmit={handleAddSubmit}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              placeholder: styles.placeholderContainer,
            }}
            sort={false}
            insertDroppableFirst={false}
            canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
              if (dragSource?.parent === dropTargetId) {
                return true;
              }
            }}
            dropTargetOffset={10}
            placeholderRender={(node, { depth }) => (
              <Placeholder node={node} depth={depth} />
            )}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default EditView;
