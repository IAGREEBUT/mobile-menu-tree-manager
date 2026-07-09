import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
type Props = {
  droppable: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return <FolderOpenOutlinedIcon color="disabled" fontSize="small" sx={{ stroke: "#ffffff", strokeWidth: 0.4 }} />;
  }else {
    return <SubdirectoryArrowRightOutlinedIcon color="disabled" fontSize="small" sx={{ stroke: "#ffffff", strokeWidth: 0.4 }} />;
  }

  switch (props.fileType) {
    case "image":
      return <ImageIcon />;
    case "csv":
      return <ListAltIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return null;
  }
};
