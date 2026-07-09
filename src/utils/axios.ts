import axios from 'axios';
import { CommonResponseEntity, StatusResponse } from '../types/serverDataTypes';
import { useNavigate } from 'react-router-dom';

const BASEURL =  `${process.env.SERVER_IP}/`;
const navigate = useNavigate();

/*
axios guide
https://yamoo9.github.io/axios/guide/#axios%EB%9E%80

axios intercept
https://yamoo9.github.io/axios/guide/interceptors.html


*/

export type errorMsg = {
  errorMsg:StatusResponse
}

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
  //header는 request시에 추가 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
    function (response) {
        
        const res:CommonResponseEntity = response.data; //백엔드에서 보낸 데이터 받음 

        // 결과가 정상인 경우 
        if(res.status.code == "E000"){
            return res.result; // 실제 리스폰스 데이터를 반환 
        }else{// 에러인 경우
            // navigate('/error',{ //에러페이지로 자동이동 
            //   state: {
            //     status:res.status.status,
            //     message:res.status.message
            //   }
            // })
            return res.status; //에러 메세지, 코드, 시간 을 반환  
        }

      },
    async (error) => {
      //서버 에러등 아예 전달을 받지 못한 경우 
      navigate('/error',{ 
        state: {
          status:error.response.data.status,
          message:error.response.data.message,
        }
      })

        // if (error.response) {
        //     // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        //     return error.response.data.status; 
        //   }

        return Promise.reject(error);
    },
);

export default axiosInstance;