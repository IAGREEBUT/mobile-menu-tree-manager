export type CommonResponseEntity = {
    status : StatusResponse;
    result:any;
}


export type StatusResponse = {
    timestamp:Date;
    code:string;
    message:string;
}