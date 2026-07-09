import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useLocation } from 'react-router-dom';


export default function ErrorPage(){
    const location = useLocation();


    // const status:string = location.state.status;
    // const message:string = location.state.message;
    const message = "알 수 없는 에러가 발생하였습니다."


    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div>
                <ErrorOutlineIcon/>
            </div>
            <div>
                <span>
                    {message}
                </span>
            </div>
        </div>
    )
}