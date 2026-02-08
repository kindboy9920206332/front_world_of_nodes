import { RequestSelectNode } from "@/types/employee"
import { listNodes } from "@/types/nodes"
import { apiClient } from "@/utils/fetching"


const clientApi  = new apiClient()

export class NodesApis {


    selcetdNodes = async(req:RequestSelectNode)=>{
        const res = await clientApi.post({url:"/employee/create-employee" , isJwt:true , request:req}) 
        return res
    }

    getListDefaultNodes = async()=>{
        const res  = await clientApi.get({url:`/node/getNodes/default`,isJwt:true}) as listNodes
        return res
    }

    
    getNodes  = async()=>{
      const res  = await clientApi.get({url:`/node/getNodes/list`,isJwt:true}) as listNodes
      return res
    }

    

}