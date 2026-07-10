import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { managerInfo } from "../../../types/dataTypes";

export type ManagerInfoProps = {
  manager: managerInfo;
  size: number;
  isBold: boolean;
};

export const ManagerInfoModal = ({
  manager,
  size,
  isBold,
}: ManagerInfoProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    //중앙위치
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    width: 400,
    bgcolor: "white",

    p: 4, //padding
  };

  return (
    <>
      <div>
        {isBold ? (
          <b
            className="text-styled"
            onClick={handleOpen}
            style={{ fontSize: size }}
          >
            {manager.name}
          </b>
        ) : (
          <p
            className="text-styled"
            onClick={handleOpen}
            style={{ fontSize: size }}
          >
            {manager.name}
          </p>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(0.5px)",
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "90%",
                }}
              >
                <AccountCircleIcon />
                <p style={{ margin: 0 }}>User Info</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "10%",
                }}
              >
                <CloseIcon onClick={handleClose} />
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ width: "30%" }}>
                <b>Employee ID</b>
              </div>
              <div style={{ width: "70%" }}>
                <span>{manager.mId}</span>
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ width: "30%" }}>
                <b>Email</b>
              </div>
              <div style={{ width: "70%" }}>
                <span>{manager.email}</span>
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ width: "30%" }}>
                <b>Name</b>
              </div>
              <div style={{ width: "70%" }}>
                <span>{manager.name}</span>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
