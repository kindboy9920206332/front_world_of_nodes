import { GetUserInfoResponse } from "@/types/infoUser"
import { apiClient } from "@/utils/fetching"

const clientApi  = new apiClient()

export class UserApis {

    getUserInfo = async()=>{
        const res  = await clientApi.get({url:`/user/infoUser`,isJwt:true}) as GetUserInfoResponse
        return res
    }
    
}