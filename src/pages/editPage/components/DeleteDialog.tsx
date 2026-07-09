import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import styles from "./styles/AddDialog.module.css";
import { NodeModel } from "../../../types/TreeTypes";

type Props = {
  id: NodeModel["id"];
  droppable: NodeModel["droppable"];
  onClose: () => void;
  onDelete: (id: NodeModel["id"]) => void;
};

export const DeleteDialog: React.FC<Props> = (props) => {
  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogContent className={styles.content}>
        {props.droppable ? (
          <Typography>
            {" "}
            Deleting this item will also delete all of its child menu items. Are
            you sure you want to continue?
          </Typography>
        ) : (
          <Typography>Are you sure you want to delete this item?</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onDelete(props.id)}>okay</Button>
        {/* <Button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable,
              data: {
                fileType
              }
            })
          }
        >
          Submit
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};
