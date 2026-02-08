import { tokenStore } from "./getToken"
import Cookies from "js-cookie"
const baseUrl = process.env.BASE_URL

const getRefresh = tokenStore.getRefresh()


export const refreshToken = async ()=>{
        let res  =  await fetch (`${baseUrl}/user/refreshToken` , {
            method:"Get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`${getRefresh}`
            },
        })
        const data = await res.json()
        if (res.status===200){
            tokenStore.setAccess(JSON.stringify(data.data.accessToken))
        }
        return{data, res}
} 




