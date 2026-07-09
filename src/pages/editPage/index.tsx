import React, { useState } from "react";
import { menuEditInfo } from "../../types/dataTypes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "./styles.css";
import EditView from "./EditTree";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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
      >
        <DialogTitle>Editing Demo Notice</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <strong>This page is an editing demo.</strong> You can rename menu
            items, add or delete items, and reorder the tree with drag and drop.
            <br />
            <br />
            <span style={{ color: "#d32f2f", fontWeight: 700 }}>
              Changes made here are not permanently saved.
            </span>
            <br />
            The original internal version used a backend server and database to
            persist changes. This portfolio rebuild focuses on the frontend UI
            and interaction flow only.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGuideDialog} variant="contained">
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
