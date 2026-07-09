import React from "react";
import {MAINBLUE, MAINORANGE, BLACK100, BLACK20, BLACK60,BLACK80} from '../../../types/colorCode';
import { comments } from "../../../types/dataTypes";
import Container from '@mui/material/Container'
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  Typography  from "@mui/material/Typography";
import ForumIcon from '@mui/icons-material/Forum';
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider'
import AttachmentIcon from '@mui/icons-material/Attachment';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import GetAppIcon from '@mui/icons-material/GetApp';
import ListItem from '@mui/material/ListItem'
import Pagination from "@mui/material/Pagination";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { DownloadFileList } from "./DownloadFileList";
import { ManagerInfoModal } from "./ManagerInfoModal";
import { CommentProps } from "..";


export type DownloadFileProps = {
    attached : any[];
}


export default function CommentView ({key}:CommentProps)  {

    //drag & drop관련 
    //등록 가능한 파일 타입 
    const [fileList, setFileList] = useState<FileList>();
    const fileTypes = ["pptx","pdf","json","jpg","jpge","png","txt","xlsx","doc"];
    const handleChange = (file: FileList) => {
        setFileList(file);
    };


    function repeat() {
        let fileNames = [];
        if(fileList){
            for(let i=0; i<fileList?.length; i++){
                fileNames.push(
                    <>
                        <Typography sx={{ fontSize: 14 }} color={BLACK60} gutterBottom>
                            {fileList.item(i)?.name}
                        </Typography>            
                    </>
                )
            }
        }

        return fileNames;

    }


    //drag and drop style 
    const fileUploader = (
        <div style={{backgroundColor: 'white', borderStyle: 'solid', borderWidth:1 ,borderRadius: 5,borderColor: BLACK60,display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', boxSizing:'border-box', padding:10}}>
        {
            !fileList ?
            (        
            <>
                <div>
                    <FileUploadIcon sx={{color: BLACK60}}/>
                </div>
                <div>
                    <Typography sx={{ fontSize: 14 }} color={BLACK60} gutterBottom>
                        드래그 또는 클릭하여 파일을 추가하세요. 
                    </Typography>
                </div>
            </>
            )
            :
            (<>
                <div>
                    <FileDownloadDoneIcon sx={{color: BLACK20}}/>
                </div>
                <div>
                    {repeat()}
                </div>
            </>
            )
        }
        </div>
      );


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

    
    //페이지네이션
    const [page, setPage] = React.useState(commentData.pageNum);
    const handleNextPage = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };


        return(
            <div>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', width:'100%'}}>
                            <ForumIcon/>
                            <span> 메모 </span> 
                        </div>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Container>
                            <Box>
                                {
                                    commentData.commentList.map((e)=>(
                                    <>
                                     <div style={{display:'flex', flexDirection:'row', paddingBottom:10, paddingTop:15, paddingRight:10, paddingLeft:10, width: '100%'}}>
                                        <div style={{display:'flex', width:'90%'}}>
                                            <div style={{display:'flex', justifyContent: 'center' , alignItems:'center', paddingRight:5}}>
                                                <AccountCircleIcon sx={{fontSize:30}}/>
                                            </div>
                                            <div>
                                                <ManagerInfoModal manager={e.manager} size={13} isBold={true}/>
                                                <div style={{display:'flex', flexDirection:'row'}} >
                                                    <div style={{display:'flex', justifyContent: 'flex-start' , alignItems:'center', paddingRight: 30, minWidth:'100px' }}>
                                                        <AccessTimeIcon sx={{fontSize: 10}}/>
                                                        <span style={{fontSize: 10}}>{e.createdTime}</span>
                                                    </div>
                                                    <div style={{display:'flex', justifyContent: 'flex-start' , alignItems:'center', minWidth:'100px'}}>
                                                        <ChangeCircleIcon sx={{fontSize: 10}}/>
                                                        <span style={{fontSize: 10}}>{e.modifiedTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        { e.attached?
                                            (
                                                <DownloadFileList attached={e.attached}/>
                                            )
                                            :
                                            (
                                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end',width: '10%',paddingRight:5}}/>
                                            )
                                        }
                                     </div> 
                                     <div style={{paddingLeft:10, paddingRight:10, paddingBottom:15}}>
                                        <span style={{fontSize: 12}}>{e.comments}</span>
                                     </div>
                                     <Divider light />
                                     </>
                                    )
                                    )
                                }
                                {
                                    commentData.totalDataNum === 0 ?
                                    (
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding: 20, flexDirection:'column'}}>
                                            <QuestionAnswerIcon sx={{color: BLACK80}} style={{fontSize: 40, paddingBottom:20}}/>
                                            <span style={{fontSize:13, color: BLACK80}}>{"작성된 메모가 존재하지 않습니다."}</span>
                                            <span style={{fontSize:13, color: BLACK80}}>{"첫 메모를 작성해보세요."}</span>
                                        </div>
                                    )
                                    :
                                    (
                                        <div style={{display:'flex', justifyContent:'center', padding: 10}}>
                                            <Stack spacing={2}>
                                                <Pagination count={Math.ceil(commentData.totalDataNum/5)} page={page} onChange={handleNextPage} shape="rounded" />
                                            </Stack>
                                        </div>
                                    )
                                }
                            </Box>
                            <Box>
                                <form>
                                    <div style={{boxSizing: 'border-box', padding: 10}}>
                                        <div style={{paddingBottom: 5}}> 
                                            <TextField
                                            id="outlined-textarea"
                                            placeholder="메모를 작성해주세요."
                                            multiline
                                            maxRows={5}
                                            sx={{width: '100%', backgroundColor: 'white'}}
                                            />
                                        </div>
                                        <div style={{ width:'100%' ,display: 'block', paddingBottom:5}}>
                                            {/* https://codesandbox.io/s/simpledialog-material-demo-lvpou9 
                                            여기에다가 디자인 넣는 법!  */}
                                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={true} children={fileUploader}/>
                                        </div>
                                        <div style={{display:'flex', justifyContent: 'flex-end'}}>
                                            <Stack spacing={2} direction="row" >
                                                <Button variant="contained" style={{backgroundColor: MAINBLUE}}>
                                                    {"등록하기"}
                                                </Button>
                                            </Stack>
                                        </div>
                                    </div>
                                </form>  
                            </Box>
                        </Container>
                    </AccordionDetails>
                </Accordion>
            </div>
        );

}


const commentData:comments = {

    key: '-1',
    pageNum:0,
    totalDataNum:8,
    commentList: [

        {
            id:0,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'-',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '-',
            modifiedTime: '-',
            comments: '수정 필요',
            attached: ['a'],
        },

        {
            id:1,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'김미래',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '-',
            modifiedTime: '2018-12-26 08:39',
            comments: '수정 필요'
        },

        {
            id:2,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'이유정',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '2018-12-26 08:39',
            modifiedTime: '-',
            comments: '수정 필요'
        },

        {
            id:3,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'이유정',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '2018-12-26 08:39',
            modifiedTime: '2018-12-26 08:39',
            comments: 'new 태그 제거 ',
            attached: ['s','a'],
        },

        {
            id:4,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'이유정',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '2018-12-26 08:39',
            modifiedTime: '2018-12-26 08:39',
            comments: '',
            attached: ['a','b.pdf','c.pptx'],
        },

        {
            id:5,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'이유정',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '2018-12-26 08:39',
            modifiedTime: '2018-12-26 08:39',
            comments: '수정 필요'
        },

        {
            id:6,
            manager:{
                    id: 1,
                    mId:'3361000',
                    name:'이유정',
                    email: 'yujeong.lee@miraeasset.com'
                },
            createdTime: '2018-12-26 08:39',
            modifiedTime: '2018-12-26 08:39',
            comments: '수정 \n필요수정 필요수정 엔터\n 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요수정 필요'
        },

    ]


}