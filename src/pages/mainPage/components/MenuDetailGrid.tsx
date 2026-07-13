import React, { ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { MenuGridInfoProps } from "..";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MAINBLUE, MAINORANGE } from "../../../types/colorCode";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import menuInfoData from "../../../assets/menuInfo.mock.json";
import { useDispatch } from "react-redux";
import { updateMainTreeNode } from "../../../modules/redux/mainTrees";
import { addHistory } from "../../../modules/redux/history";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function MenuInfoGrid({ selectedNode }: MenuGridInfoProps) {
  const defaultSelectedNode = {
    key: "-",
    id: "-",
    path: "-",
    name: "-",
    icon: "-",
    visible: -1,
    type: -1,
    permissionLevel: -1,
    initialData: "-",
    helpPath: "-",
    shortcutName: "-",
    hideShortcut: "-",
    flags: "-",
    searchName: "-",
    externalPath: "-",
    metadata: "-",
  };

  //key부분은 노출되어서는 안되기 때문에 분리
  const { key, ...others } = selectedNode ?? defaultSelectedNode; //key부분 제거
  const dispatch = useDispatch();

  const [modifyMode, setModifyMode] = useState<boolean>(false);

  const description: string[] = menuInfoData.description.slice(0, -1);
  const descTitle: string[] = menuInfoData.property.slice(0, -1);

  const getParenthesesText = (value: unknown): string | null => {
    if (typeof value !== "string") {
      return null;
    }

    const match = value.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
  };

  const removeParenthesesText = (value: unknown): string => {
    if (value === undefined || value === null) {
      return "";
    }

    return String(value).replace(/\s*\([^)]*\)/, "");
  };

  const renderEditableRow = (
    label: string | undefined,
    valueCell: React.ReactNode
  ) => (
    <TableRow style={{ height: "45px" }}>
      <TableCell align="left" sx={{ maxWidth: 100 }}>
        {label}
      </TableCell>
      <TableCell align="left" sx={{ width: "fit-content", minWidth: 300 }}>
        {valueCell}
      </TableCell>
    </TableRow>
  );

  //수정모드 -> 저장하기를 누르면 (others.id & sid 를 쌍으로 전송)
  const [sid, setSid] = useState<string>(others.id ?? "");
  const [spath, setSpath] = useState<string>(others.path ?? "");
  const [sname, setSname] = useState<string>(others.name ?? "");
  const [sicon, setSicon] = useState<string>(others.icon ?? "");
  const [ivisible, setIvisible] = useState<number>(others.visible ?? 1); //visibility (0:hide,1:show)
  const [itype, setItype] = useState<number>(others.type ?? 2); //menyType (0:menu,1:submenu,2:expanded menu)
  const [ipermission, setIpermissionLevel] = useState<number>(
    others.permissionLevel ?? 6
  ); //"permission(0:public,1:basic,5:read-only,6:admin)",
  const [sinitialData, setSInitialData] = useState<string>(
    others.initialData ?? ""
  );
  const [shelpPath, setShelpPath] = useState<string>(others.helpPath ?? "");
  const [sshortcutName, setSShortcutName] = useState<string>(
    others.shortcutName ?? ""
  );
  const [shideShortcut, setSHideShortCut] = useState<string>(
    others.hideShortcut ?? ""
  );
  const [sFlags, setSFlags] = useState<string>(others.flags ?? "");
  const [ssearchName, setSsearchName] = useState<string>(
    others.searchName ?? ""
  );
  const [sExternalPath, setSExternalPath] = useState<string>(
    others.externalPath ?? ""
  );
  const [sMetaData, setSMetaData] = useState<string>(others.metadata ?? "");

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleChangeVisible = (event: SelectChangeEvent) => {
    setIvisible(parseInt(event.target.value));
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setItype(parseInt(event.target.value));
  };

  const handleChangePermissionLevel = (event: SelectChangeEvent) => {
    setIpermissionLevel(parseInt(event.target.value));
  };

  const handleChangeHideShortCut = (event: SelectChangeEvent) => {
    setSHideShortCut(event.target.value);
  };

  const handleChangeExternalPath = (event: SelectChangeEvent) => {
    setSExternalPath(event.target.value);
  };

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSid(event.target.value);
  };
  const handleChangePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpath(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSname(event.target.value);
  };

  const handleChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSicon(event.target.value);
  };

  const handleChangePermissionText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number.isInteger(event.target.value)) {
      setIpermissionLevel(parseInt(event.target.value));
    } else {
      setShowAlert(true);
    }
  };

  const handleChangeInitialData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSInitialData(event.target.value);
  };

  const handleChangeHelpPath = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelpPath(event.target.value);
  };

  const handleChangeShortcutName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSShortcutName(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (modifyMode) {
      //update main tree
      dispatch(
        updateMainTreeNode(key, {
          id: sid,
          path: spath,
          name: sname,
          icon: sicon,
          visible: ivisible,
          type: itype,
          permissionLevel: ipermission,
          initialData: sinitialData,
          helpPath: shelpPath,
          shortcutName: sshortcutName,
          hideShortcut: shideShortcut,
          flags: sFlags,
          searchName: ssearchName,
          externalPath: sExternalPath,
          metadata: sMetaData,
        })
      );
    }

    //add
    const changeHistories = [
      { property: "id", before: others.id, after: sid },
      { property: "path", before: others.path, after: spath },
      { property: "name", before: others.name, after: sname },
      { property: "icon", before: others.icon, after: sicon },
      { property: "visible", before: others.visible, after: ivisible },
      { property: "type", before: others.type, after: itype },
      {
        property: "permissionLevel",
        before: others.permissionLevel,
        after: ipermission,
      },
      {
        property: "initialData",
        before: others.initialData,
        after: sinitialData,
      },
      { property: "helpPath", before: others.helpPath, after: shelpPath },
      {
        property: "shortcutName",
        before: others.shortcutName,
        after: sshortcutName,
      },
      {
        property: "hideShortcut",
        before: others.hideShortcut,
        after: shideShortcut,
      },
      { property: "flags", before: others.flags, after: sFlags },
      { property: "searchName", before: others.searchName, after: ssearchName },
      {
        property: "externalPath",
        before: others.externalPath,
        after: sExternalPath,
      },
      { property: "metadata", before: others.metadata, after: sMetaData },
    ];

    changeHistories.forEach(({ property, before, after }) => {
      const beforeText = String(before ?? "");
      const afterText = String(after ?? "");

      if (beforeText !== afterText) {
        dispatch(addHistory(key, property, beforeText, afterText));
      }
    });
    setModifyMode(!modifyMode);
  };

  const handleChangeFlags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSFlags(event.target.value);
  };

  const handleChangeSearchName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSsearchName(event.target.value);
  };

  const handleChangeMetaData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSMetaData(event.target.value);
  };

  const editableRows = [
    {
      label: description.at(0),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sid}
          variant="standard"
          onChange={handleChangeId}
        />
      ),
    },
    {
      label: description.at(1),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={spath}
          variant="standard"
          onChange={handleChangePath}
        />
      ),
    },
    {
      label: description.at(2),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sname}
          variant="standard"
          onChange={handleChangeName}
        />
      ),
    },
    {
      label: description.at(3),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sicon}
          variant="standard"
          onChange={handleChangeIcon}
        />
      ),
    },
    {
      label: description.at(4),
      valueCell: (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={ivisible.toString()}
            onChange={handleChangeVisible}
            label="Show"
          >
            <MenuItem value={0}> 0:hide </MenuItem>
            <MenuItem value={1}> 1:show </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: description.at(5),
      valueCell: (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={itype.toString()}
            onChange={handleChangeType}
            label="Type"
          >
            <MenuItem value={0}> 0:메뉴항목 </MenuItem>
            <MenuItem value={1}> 1:서브메뉴 </MenuItem>
            <MenuItem value={2}> 2:확장메뉴 </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: description.at(6),
      valueCell: (
        <>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={ipermission.toString()}
              onChange={handleChangePermissionLevel}
              label="Permission"
            >
              <MenuItem value={0}> 0:public </MenuItem>
              <MenuItem value={1}> 1:basic </MenuItem>
              <MenuItem value={5}> 5:read-only </MenuItem>
              <MenuItem value={6}> 6:admin </MenuItem>
              <MenuItem value={-1}> others </MenuItem>
            </Select>
          </FormControl>
          {ipermission === -1 && (
            <TextField
              size="small"
              id="standard-basic"
              placeholder={"enter the value."}
              variant="standard"
              value={ipermission}
              onChange={handleChangePermissionText}
            />
          )}
        </>
      ),
    },
    {
      label: description.at(7),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sinitialData}
          variant="standard"
          onChange={handleChangeInitialData}
        />
      ),
    },
    {
      label: description.at(8),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={shelpPath}
          variant="standard"
          onChange={handleChangeHelpPath}
        />
      ),
    },
    {
      label: description.at(9),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sshortcutName}
          variant="standard"
          onChange={handleChangeShortcutName}
        />
      ),
    },
    {
      label: description.at(10),
      valueCell: (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={shideShortcut}
            onChange={handleChangeHideShortCut}
            label="showQuick"
          >
            <MenuItem value={""}> - </MenuItem>
            <MenuItem value={"0"}> 0: show </MenuItem>
            <MenuItem value={"1"}> 1: hide </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: description.at(11),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sFlags}
          variant="standard"
          onChange={handleChangeFlags}
        />
      ),
    },
    {
      label: description.at(12),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={ssearchName}
          variant="standard"
          onChange={handleChangeSearchName}
        />
      ),
    },
    {
      label: description.at(13),
      valueCell: (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sExternalPath}
            onChange={handleChangeExternalPath}
            label="addPath"
          >
            <MenuItem value={""}> disable </MenuItem>
            <MenuItem value={"1"}> 1: enable </MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: description.at(14),
      valueCell: (
        <TextField
          size="small"
          id="standard-basic"
          value={sMetaData}
          variant="standard"
          onChange={handleChangeMetaData}
        />
      ),
    },
  ];

  useEffect(() => {
    setSid(others.id ?? "");
    setSpath(others.path ?? "");
    setSname(others.name ?? "");
    setSicon(others.icon ?? "");
    setIvisible(others.visible ?? 1);
    setItype(others.type ?? 2);
    setIpermissionLevel(others.permissionLevel ?? 6);
    setSInitialData(others.initialData ?? "");
    setShelpPath(others.helpPath ?? "");
    setSShortcutName(others.shortcutName ?? "");
    setSHideShortCut(String(others.hideShortcut ?? ""));
    setSFlags(others.flags ?? "");
    setSsearchName(others.searchName ?? "");
    setSExternalPath(others.externalPath ?? "");
    setSMetaData(others.metadata ?? "");
  }, [key]);

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
              <InfoIcon />
              <span> Menu Detail</span>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer
            component={Paper}
            style={{ display: "block", width: "100%" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  style={{ backgroundColor: "#f5f5f5", height: "35px" }}
                >
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modifyMode ? (
                  <>
                    {editableRows.map((row, index) => (
                      <React.Fragment key={`editable-row-${index}`}>
                        {renderEditableRow(
                          removeParenthesesText(row.label),
                          row.valueCell
                        )}
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {Object.values(others).map((e, index) => (
                      <TableRow style={{ height: "45px" }}>
                        <TableCell align="left" sx={{ maxWidth: 100 }}>
                          <span>
                            {removeParenthesesText(description.at(index))}
                          </span>
                          {getParenthesesText(description.at(index)) && (
                            <Tooltip
                              title={
                                getParenthesesText(description.at(index)) ?? ""
                              }
                              arrow
                            >
                              <HelpOutlineIcon
                                fontSize="small"
                                sx={{
                                  marginLeft: 0.5,
                                  verticalAlign: "middle",
                                  cursor: "help",
                                  color: "warning.main",
                                }}
                              />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            width: "fit-content",
                            minWidth: 300,
                            maxHeight: 10,
                          }}
                        >
                          {e}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Box style={{ padding: 5 }}>
              <Stack spacing={2} direction="row">
                {modifyMode ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: MAINORANGE }}
                    onClick={handleClick}
                  >
                    {"SAVE"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: MAINBLUE }}
                    onClick={handleClick}
                  >
                    {"EDIT"}
                  </Button>
                )}
              </Stack>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
