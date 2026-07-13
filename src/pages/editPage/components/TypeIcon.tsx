import React from "react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
type Props = {
  droppable: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return (
      <FolderOpenOutlinedIcon
        color="disabled"
        fontSize="small"
        sx={{ stroke: "#ffffff", strokeWidth: 0.4 }}
      />
    );
  } else {
    return (
      <SubdirectoryArrowRightOutlinedIcon
        color="disabled"
        fontSize="small"
        sx={{ stroke: "#ffffff", strokeWidth: 0.4 }}
      />
    );
  }
};
