export type GET = {
    isJwt:boolean,
    url:string
}


export type POUA ={
      url:string
      isJwt:boolean,
      request:any  
}


export type POUAF = {
  
      url:string
      isJwt:boolean,
      request:any,
      method:Method

}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


export type ApiResponse<TData> = {
  res: Response;
  data: {data:TData, message:string};
};


export type ErrorHandler = {
      messsage:string,
      status:number,
      code:string,
}


