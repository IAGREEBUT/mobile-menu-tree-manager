import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useMediaQuery } from "react-responsive";

export default function Header() {
  const userLabel: string = "Demo User";

  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div style={{ backgroundColor: "red", width: "70%" }}>
        <span>Mobile Menu Tree Manager</span>
      </div>
      {!isBigScreen ? (
        <div
          style={{
            backgroundColor: "blue",
            display: "flex",
            width: "30%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <AccountCircleIcon />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "blue",
            display: "flex",
            width: "30%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <AccountCircleIcon />
          <span>{userLabel}</span>
        </div>
      )}
      {/* <div style={{backgroundColor: 'blue', display:'flex', width: '50%', alignItems: 'flex-end', justifyContent:'flex-end'}}>
                <AccountCircleIcon/>
                <span>{userLabel}</span>
            </div> */}
    </div>
  );
}
