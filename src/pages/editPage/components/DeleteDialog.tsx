import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { NodeModel } from "../../../types/TreeTypes";
import { DANGER_RED } from "../../../types/colorCode";

type Props = {
  id: NodeModel["id"];
  droppable: NodeModel["droppable"];
  onClose: () => void;
  onDelete: (id: NodeModel["id"]) => void;
};

export const DeleteDialog: React.FC<Props> = (props) => {
  const handleDelete = () => {
    props.onDelete(props.id);
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
            "linear-gradient(135deg, #fff1f2 0%, #ffffff 58%, #f8fafc 100%)",
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
              backgroundColor: DANGER_RED,
              boxShadow: "0 8px 18px rgba(220, 38, 38, 0.24)",
            }}
          >
            <WarningAmberRoundedIcon fontSize="small" />
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
              Delete Menu
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            px: 1.5,
            py: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#374151",
              lineHeight: 1.5,
            }}
          >
            Are you sure you want to delete this menu item?
          </Typography>

          {props.droppable && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              All child menus under this item will be deleted together.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 1.5,
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
          color="error"
          onClick={handleDelete}
          sx={{
            px: 2.75,
            fontWeight: 700,
            textTransform: "none",
            backgroundColor: DANGER_RED,
          }}
        >
          Delete Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
