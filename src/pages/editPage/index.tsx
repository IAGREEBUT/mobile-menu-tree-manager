import React, { useState } from "react";
import { menuEditInfo } from "../../types/dataTypes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "./styles.css";
import EditView from "./EditTree";
import DialogContentText from "@mui/material/DialogContentText";
import { MAINBLUE, ALERT_YELLOW, DANGER_RED } from "../../types/colorCode";
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

//TreeFilter로 넘기는 Props
export type TreeFilterProps = {
  menuInfoData?: menuEditInfo;
};

export default function EditPage() {
  const [openGuideDialog, setOpenGuideDialog] = useState(true);

  const handleCloseGuideDialog = () => {
    setOpenGuideDialog(false);
  };

  return (
    <div className="main-container">
      <div className="start">
        <Header />
      </div>
      <Dialog
        open={openGuideDialog}
        onClose={handleCloseGuideDialog}
        maxWidth="sm"
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
                backgroundColor: ALERT_YELLOW,
                boxShadow: "0 8px 18px rgba(245, 158, 11, 0.24)",
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
                Editing Demo Notice
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" sx={{ paddingTop: 2 }}>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              <strong>This page is an editing demo.</strong> You can rename menu
              items, add or delete items, and reorder the tree with drag and
              drop.
              <br />
              <br />
              <span style={{ color: DANGER_RED, fontWeight: 700 }}>
                Changes made here are not permanently saved.
              </span>
              <br />
              The original internal version used a backend server and database
              to persist changes. This portfolio rebuild focuses on the frontend
              UI and interaction flow only.
            </Typography>
          </DialogContentText>
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
            onClick={handleCloseGuideDialog}
            variant="contained"
            sx={{
              px: 2.75,
              fontWeight: 700,
              textTransform: "none",
              backgroundColor: ALERT_YELLOW,
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
      <Container component={Paper} className="main-content">
        <EditView />
      </Container>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
