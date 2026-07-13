import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();

  // const status:string = location.state.status;
  // const message:string = location.state.message;
  const message = "An unknown error occurred.";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <ErrorOutlineIcon />
      </div>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
}
