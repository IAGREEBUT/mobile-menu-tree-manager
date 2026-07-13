import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "./styles/AddDialog.module.css";
import { CustomData } from "../../../types/TreeTypes";
import { NodeModel } from "../../../types/TreeTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/redux";

type Props = {
  parentId: NodeModel["id"];
  onClose: () => void;
  onSubmit: (e: Omit<NodeModel<CustomData>, "id">) => void;
};

export const AddDialog: React.FC<Props> = (props) => {
  const tree: NodeModel<CustomData>[] = useSelector(
    (state: RootState) => state.trees.treeData
  );

  const [text, setText] = useState("");
  const [fileType, setFileType] = useState("text");
  const [parent, setParent] = useState(props.parentId);
  const [droppable, setDroppable] = useState(false);
  const [order, setOrder] = useState(() => {
    return tree.filter((element) => props.parentId === element.parent).length; //해당 부모의 자식의 수가 order(최하위배치 )
  });

  console.log("parent is : " + props.parentId);

  const handleChangeText = (e: any) => {
    setText(e.target.value);
  };

  const handleChangeParent = (e: any) => {
    setParent(Number(e.target.value));
  };

  const handleChangeDroppable = (e: any) => {
    setDroppable(e.target.checked);
  };

  const handleChangeFileType = (e: any) => {
    setFileType(e.target.value);
  };

  // const handleSubmit = () => {
  //   props.onSubmit
  //   props.onClose
  // }

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Add New Menu</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField
            label="Menu Name"
            onChange={handleChangeText}
            value={text}
          />
        </div>
        {/* <div>
          <FormControl className={styles.select}>
            <InputLabel>Parent</InputLabel>
            <Select label="Parent" onChange={handleChangeParent} value={parent}>
              <MenuItem value={0}>(root)</MenuItem>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div> */}
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={droppable}
                onChange={handleChangeDroppable}
                color="primary"
              />
            }
            label="Allow Child Menus"
          />
        </div>
        {/* {!droppable && (
          <div>
            <FormControl className={styles.select}>
              <InputLabel>File type</InputLabel>
              <Select
                label="FileType"
                onChange={handleChangeFileType}
                value={fileType}
              >
                <MenuItem value="text">TEXT</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="image">IMAGE</MenuItem>
              </Select>
            </FormControl>
          </div>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          disabled={text === ""}
          onClick={() => {
            props.onSubmit({
              text,
              parent,
              droppable,
              data: {
                order,
              },
            });

            props.onClose(); //추가하고 나서 닫아야함
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
