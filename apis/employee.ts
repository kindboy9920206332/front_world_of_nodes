import { RequestSelectNode } from "@/types/employee"
import { listNodes } from "@/types/nodes"
import { apiClient } from "@/utils/fetching"


const clientApi  = new apiClient()

export class EmploteeApis {


    selcetdNodes = async(req:RequestSelectNode)=>{
        const res = await clientApi.post({url:"/employee/create-employee" , isJwt:true , request:req}) 
        return res
    }


    

}