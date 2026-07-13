import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Chip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { ManagerInfoModal } from "../pages/mainPage/components/ManagerInfoModal";

export default function Header() {
  const userLabel: string = "Demo User";

  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minHeight: 72,
        padding: "0 32px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 8px 18px rgba(37, 99, 235, 0.25)",
          }}
        >
          <Inventory2OutlinedIcon fontSize="small" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#111827",
              }}
            >
              Mobile Menu Tree Manager
            </span>
            {isBigScreen && (
              <Chip
                label="Frontend-only rebuild"
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1d4ed8",
                  backgroundColor: "#dbeafe",
                }}
              />
            )}
          </div>

          {isBigScreen && (
            <span
              style={{
                fontSize: 13,
                color: "#6b7280",
              }}
            >
              Legacy mobile app menu configuration editor
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: isBigScreen ? "8px 12px" : 0,
          borderRadius: 999,
          backgroundColor: isBigScreen ? "#f9fafb" : "transparent",
          border: isBigScreen ? "1px solid #e5e7eb" : "none",
        }}
      >
        {isBigScreen && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              <ManagerInfoModal id={0} size={13} isBold={false} />
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
