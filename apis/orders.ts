import { RequestSelectNode } from "@/types/employee"
import { listNodes } from "@/types/nodes"
import { ListTrades, TradeDoc } from "@/types/orders"
import { apiClient } from "@/utils/fetching"


const clientApi  = new apiClient()

export class OrdersApis {

    getNodes = async()=>{
      const res  = await clientApi.get({url:`/order/getOrders`,isJwt:true}) as ListTrades
      return res
    }

    

}