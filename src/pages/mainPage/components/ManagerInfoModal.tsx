import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { managerInfo } from "../../../types/dataTypes";
import { getManagerById } from "../../../modules/util/searchManager";

export type ManagerInfoProps = {
  id: number;
  size: number;
  isBold: boolean;
};

export const ManagerInfoModal = ({ id, size, isBold }: ManagerInfoProps) => {
  const manager: managerInfo = getManagerById(id);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const profileSrc = manager.profile?.trim() || undefined;
  const role = manager.role?.trim() || "Project Member";

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    maxWidth: "calc(100vw - 32px)",
    bgcolor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.22)",
    overflow: "hidden",
    outline: "none",
  };

  const renderInfoRow = (
    icon: React.ReactNode,
    label: string,
    value: string
  ) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "32px 112px 1fr",
        alignItems: "center",
        gap: 1.25,
        py: 1.4,
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "8px",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: "#111827",
          wordBreak: "break-word",
        }}
      >
        {value || "—"}
      </Typography>
    </Box>
  );

  return (
    <>
      <Box
        onClick={handleOpen}
        className="text-styled"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          cursor: "pointer",
          fontSize: size,
          fontWeight: isBold ? 700 : 500,
          color: "#111827",
          lineHeight: 1.2,
          "&:hover": {
            color: "#2563eb",
          },
        }}
      >
        <Avatar
          src={profileSrc}
          sx={{
            width: Math.max(size + 10, 26),
            height: Math.max(size + 10, 26),
            bgcolor: "#dbeafe",
            color: "#2563eb",
            border: "1px solid #e5e7eb",
          }}
        >
          {!profileSrc && <AccountCircleIcon fontSize="small" />}
        </Avatar>
        <span>{manager.name}</span>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="manager-info-modal-title"
        aria-describedby="manager-info-modal-description"
        sx={{
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(2px)",
            backgroundColor: "rgba(15, 23, 42, 0.2)",
          },
        }}
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              position: "relative",
              px: 3,
              pt: 3,
              pb: 2.5,
              background:
                "linear-gradient(135deg, #eff6ff 0%, #ffffff 58%, #f8fafc 100%)",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "#6b7280",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#111827",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={profileSrc}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#dbeafe",
                  color: "#2563eb",
                  border: "4px solid #ffffff",
                  boxShadow: "0 14px 30px rgba(37, 99, 235, 0.22)",
                }}
              >
                {!profileSrc && <AccountCircleIcon sx={{ fontSize: 46 }} />}
              </Avatar>

              <Box sx={{ minWidth: 0, pr: 3 }}>
                <Typography
                  id="manager-info-modal-title"
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#111827",
                    lineHeight: 1.15,
                  }}
                >
                  {manager.name}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.6,
                    fontSize: 13,
                    color: "#6b7280",
                    wordBreak: "break-word",
                  }}
                >
                  {manager.email}
                </Typography>
                <Chip
                  label={role}
                  size="small"
                  sx={{
                    mt: 1.25,
                    height: 24,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1d4ed8",
                    backgroundColor: "#dbeafe",
                    border: "1px solid #bfdbfe",
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Box id="manager-info-modal-description" sx={{ px: 3, py: 2.25 }}>
            {renderInfoRow(
              <BadgeOutlinedIcon fontSize="small" />,
              "Employee ID",
              manager.mId
            )}
            <Divider />
            {renderInfoRow(
              <EmailOutlinedIcon fontSize="small" />,
              "Email",
              manager.email ?? "-"
            )}
            <Divider />
            {renderInfoRow(<WorkOutlineIcon fontSize="small" />, "Role", role)}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
