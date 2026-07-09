import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { CustomData } from "../../../types/TreeTypes";
import { TypeIcon } from "./TypeIcon";
import styles from "./styles/CustomNode.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NodeModel } from "../../../types/TreeTypes";
import { DeleteDialog } from "./DeleteDialog";
import AddIcon from "@mui/icons-material/Add";
import { AddDialog } from "./AddDialog";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../modules/redux";
import { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onOpenAddDialog: () => void;
  onAddSubmit: (newNode: Omit<NodeModel<CustomData>, "id">) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  //
  const tree: NodeModel<CustomData>[] = useSelector(
    (state: RootState) => state.trees.treeData
  );

  //자식이 생기면 여는 표시를 생기게하기ㅇ 위해서
  useEffect(() => {
    setOrder(tree.filter((element) => props.node.id === element.parent).length);
  }, [tree]);

  const [order, setOrder] = useState(() => {
    return tree.filter((element) => props.node.id === element.parent).length; //본인의 자식 수
  });

  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  //editable
  const { id, text } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };
  //editable end

  //삭제 모달 띄우기
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => {
    setOpenDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  //add모달 띄우기
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenAdd(true);
  };

  const handleCloseDialog = () => {
    setOpenAdd(false);
  };

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? styles.isOpen : ""
        }`}
      >
        {props.node.droppable && order !== 0 && (
          <div onClick={handleToggle}>
            <ChevronRightIcon fontSize="small" color="disabled" />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable || false} />
      </div>
      {/* editable */}
      <div className={styles.labelGridItem}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <TextField
              className={`${styles.textField}
              ${styles.nodeInput}`}
              value={labelText}
              onChange={handleChangeText}
            />
            <div className={styles.editButtonWrap}>
              <div className={styles.editButton}>
                <IconButton
                  className={styles.editButton}
                  onClick={handleSubmit}
                  disabled={labelText === ""}
                >
                  <CheckIcon className={styles.editIcon} />
                </IconButton>
              </div>
              <div className={styles.editButton}>
                <IconButton
                  className={styles.editButton}
                  onClick={handleCancel}
                >
                  <CloseIcon className={styles.editIcon} />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <Typography variant="body2" className={styles.nodeLabel}>
              {props.node.text}
            </Typography>
            <div className={styles.actionButtonWrap}>
              <div className={styles.actionButton}>
                {props.node.droppable && (
                  <>
                    <IconButton
                      className={styles.actionButton}
                      onClick={handleOpenDialog}
                    >
                      <AddCircleOutlineOutlinedIcon
                        className={styles.actionIcon}
                      />
                    </IconButton>
                    {openAdd && (
                      <AddDialog
                        parentId={id}
                        // tree={props.treeData}
                        onClose={handleCloseDialog}
                        onSubmit={props.onAddSubmit}
                      />
                    )}
                  </>
                )}
              </div>
              <div className={styles.actionButton}>
                <IconButton
                  className={styles.actionButton}
                  onClick={handleShowInput}
                >
                  <EditOutlinedIcon className={styles.actionIcon} />
                </IconButton>
              </div>
              <div className={styles.actionButton}>
                <IconButton
                  className={styles.actionButton}
                  onClick={handleOpenDeleteDialog}
                >
                  <DeleteOutlineIcon className={styles.actionIcon} />
                </IconButton>
                {openDelete && (
                  <DeleteDialog
                    id={id}
                    droppable={droppable}
                    onClose={handleCloseDeleteDialog}
                    onDelete={props.onDelete}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* editable */}
    </div>
  );
};
