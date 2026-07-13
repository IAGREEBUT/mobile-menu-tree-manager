import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/joy";
import { useState, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { HistoryProps, MenuGridInfoProps } from "..";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MAINBLUE, MAINORANGE } from "../../../types/colorCode";
import { menuHistory } from "../../../types/dataTypes";
import Pagination from "@mui/material/Pagination";
import "../styles.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import { managerInfo } from "../../../types/dataTypes";
import { ManagerInfoModal } from "./ManagerInfoModal";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../modules/redux";

export default function HistoryGrid({ menyKey }: HistoryProps) {
  const historyData = useSelector(
    (state: RootState) => state.history.historyByMenuKey[menyKey]
  );

  const displayHistoryData: menuHistory = historyData ?? {
    key: menyKey,
    pageNum: 0,
    totalDataNum: 0,
    historyList: [],
  };
  const HISTORY_PER_PAGE = 10;

  //key + page로 요청
  const [page, setPage] = React.useState(displayHistoryData.pageNum + 1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const reversedHistoryList = [...displayHistoryData.historyList].reverse();

  const pagedHistoryList = reversedHistoryList.slice(
    (page - 1) * HISTORY_PER_PAGE,
    page * HISTORY_PER_PAGE
  );

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <HistoryIcon />
              <span>Change History</span>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer style={{ display: "block", width: "100%" }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow
                  style={{ backgroundColor: "#f5f5f5", height: "35px" }}
                >
                  <TableCell align="left">Modified Date</TableCell>
                  <TableCell align="left">Modified by</TableCell>
                  <TableCell align="left">Modified feature</TableCell>
                  <TableCell align="left">Change Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedHistoryList.map((e) => (
                  <TableRow key={e.id} style={{ height: "15px" }}>
                    <TableCell align="left" sx={{ fontSize: 12 }}>
                      {e.timestamp}
                    </TableCell>
                    <TableCell align="left">
                      <ManagerInfoModal
                        id={e.managerId}
                        size={12}
                        isBold={false}
                      />
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 12 }}>
                      {e.changedProperty}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 12 }}>
                      {e.before}
                      {" => "}
                      {e.after}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {displayHistoryData.totalDataNum === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                {"No change history found."}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(
                      displayHistoryData.totalDataNum / HISTORY_PER_PAGE
                    )}
                    page={page}
                    onChange={handleChange}
                    shape="rounded"
                  />
                </Stack>
              </div>
            )}
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
