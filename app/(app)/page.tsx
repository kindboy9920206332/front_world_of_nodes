"use client"

import { DarkLightToggleButton } from "@/components/ui/btns/darkLight";
import { checkRefershToken } from "@/utils/checkRefreshToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomeGame from "../home";
import TableOrders from "@/components/pages/orders/tables";

export default function Home() {
const router = useRouter()

useEffect(()=>{

  const checkAPi = async()=>{
    const res = await checkRefershToken()
    console.log(res)
    if (res.isExpired && res.status===401){
      router.push("/login")
    }
    else if (!res.isExpired && res.status!==200){
    }
  }
  checkAPi()
} , [])






return (
<>

<div className=" w-full min-h-screen ">

  <HomeGame />

</div>


</>
  );
}
