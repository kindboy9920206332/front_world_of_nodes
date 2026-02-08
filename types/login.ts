import { ApiResponse } from "./basicApis";
import { InfoUser } from "./infoUser";

export type RegisterResult = {
accessToken:string,
refreshToken:string,
user:InfoUser,
};


export type Otp = {
email:string
existUser:boolean 
otp:string 
}

export type Login = {
accessToken:string,
refreshToken:string,
user:InfoUser,
}

export type RegisterResponse = ApiResponse<RegisterResult>;
export type OtpResponse = ApiResponse<Otp>;
export type LoginResponse = ApiResponse<Login>;

