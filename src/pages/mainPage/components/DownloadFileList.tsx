

import React from "react";
import IconButton from '@mui/material/IconButton'
import AttachmentIcon from '@mui/icons-material/Attachment';
import GetAppIcon from '@mui/icons-material/GetApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { DownloadFileProps } from "./CommentView";

export const DownloadFileList = ({attached}:DownloadFileProps) => {

      // 댓글에 포함된 파일 저장 관련 
      
      const ITEM_HEIGHT = 48;
      

      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
          setAnchorEl(null);
      };
      const downloadFile = (file:any) => {
          console.log(file);
          console.log("download file button clicked")
      }

    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end',width: '10%',paddingRight:5}}>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <AttachmentIcon sx={{fontSize:20}}/>
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            onClose={handleClose}
            open={open}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
            },
            }}
        >
            {attached.map((f) => (
            <MenuItem key={f} onClick={downloadFile}>
                <span style={{width:'80%'}}>{f}</span>
                <GetAppIcon/>
            </MenuItem>
            ))}
        </Menu>
    </div>
    )
}

