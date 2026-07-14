import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styles from "./styles/AddDialog.module.css";
import { CustomData, NodeModel } from "../../../types/TreeTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/redux";
import { MAINBLUE } from "../../../types/colorCode";

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
  const [parent] = useState(props.parentId);
  const [droppable, setDroppable] = useState(false);

  const [order] = useState(() => {
    return tree.filter((element) => props.parentId === element.parent).length;
  });

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleChangeDroppable = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDroppable(event.target.checked);
  };

  const handleSubmit = () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    props.onSubmit({
      text: trimmedText,
      parent,
      droppable,
      data: {
        order,
      },
    });

    props.onClose();
  };

  return (
    <Dialog
      open
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.22)",
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          pt: 3,
          pb: 2.25,
          borderBottom: "1px solid #e5e7eb",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 58%, #f8fafc 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              backgroundColor: MAINBLUE,
              boxShadow: "0 8px 18px rgba(37, 99, 235, 0.24)",
            }}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </Box>

          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: 20,
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              Add New Menu
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        className={styles.content}
        sx={{
          px: 3,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.25,
          backgroundColor: "#ffffff",
        }}
      >
        <Box sx={{ py: 1 }}>
          <Typography
            component="label"
            htmlFor="new-menu-name"
            sx={{
              display: "block",
              mb: 0.75,
              fontSize: 13,
              fontWeight: 700,
              color: "#374151",
            }}
          >
            Menu Name
          </Typography>

          <TextField
            id="new-menu-name"
            placeholder="Enter menu name"
            value={text}
            onChange={handleChangeText}
            fullWidth
            size="small"
            autoFocus
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                backgroundColor: "#ffffff",

                "&.Mui-focused fieldset": {
                  borderColor: MAINBLUE,
                },
              },
            }}
          />
        </Box>

        <Box>
          <FormControlLabel
            sx={{
              alignItems: "flex-start",
              m: 0,
              width: "100%",

              "& .MuiCheckbox-root": {
                mt: -0.4,
                color: "#9ca3af",

                "&.Mui-checked": {
                  color: MAINBLUE,
                },
              },
            }}
            control={
              <Checkbox checked={droppable} onChange={handleChangeDroppable} />
            }
            label={
              <Box sx={{ pt: 0.2 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  Allow Child Menus
                </Typography>

                <Typography
                  sx={{
                    mt: 0.25,
                    fontSize: 12,
                    color: "#6b7280",
                  }}
                >
                  Enable this option if the new item can contain nested menus.
                </Typography>
              </Box>
            }
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <Button
          onClick={props.onClose}
          sx={{
            px: 2.25,
            color: "#374151",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={text.trim() === ""}
          onClick={handleSubmit}
          sx={{
            px: 2.75,
            fontWeight: 700,
            textTransform: "none",
            backgroundColor: MAINBLUE,
          }}
        >
          Add Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
