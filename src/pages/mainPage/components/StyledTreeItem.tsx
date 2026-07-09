import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    height:30,
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 10,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(1),
    },
  },
}));

export default function StyledTreeItem(props: StyledTreeItemProps) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelText,
    ...other
  } = props;

  const styleProps = {
    '--tree-view-color': color,
    '--tree-view-bg-color':bgColor,
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            pr: 0,
          }}
        >
          <Box color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
        </Box>
      }
      style={styleProps}
      {...other}
    />
  );
}

// export default function GmailTreeView() {
//   return (
//     <TreeView
//       aria-label="gmail"
//       defaultExpanded={['3']}
//       defaultCollapseIcon={<ArrowDropDownIcon />}
//       defaultExpandIcon={<ArrowRightIcon />}
//       defaultEndIcon={<div style={{ width: 24 }} />}
//       sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
//     >
//       <StyledTreeItem nodeId="1" labelText="All Mail"/>
//       <StyledTreeItem nodeId="2" labelText="Trash"  />
//       <StyledTreeItem nodeId="3" labelText="Categories">
//         <StyledTreeItem
//           nodeId="5"
//           labelText="Social"
//         />
//         <StyledTreeItem
//           nodeId="6"
//           labelText="Updates"
//         />
//         <StyledTreeItem
//           nodeId="7"
//           labelText="Forums"
//         />
//         <StyledTreeItem
//           nodeId="8"
//           labelText="Promotions"

//         />
//       </StyledTreeItem>
//       <StyledTreeItem nodeId="4" labelText="History"/>
//     </TreeView>
//   );
// }