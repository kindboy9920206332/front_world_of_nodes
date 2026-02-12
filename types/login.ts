import { ApiResponse } from "./basicApis";
import { GetUserInfoPayload } from "./infoUser";

export type RegisterResult = {
accessToken:string,
refreshToken:string,
user:GetUserInfoPayload,
};


export type Otp = {
email:string
existUser:boolean 
otp:string 
}

export type Login = {
accessToken:string,
refreshToken:string,
user:GetUserInfoPayload,
}

export type RegisterResponse = ApiResponse<RegisterResult>;
export type OtpResponse = ApiResponse<Otp>;
export type LoginResponse = ApiResponse<Login>;

