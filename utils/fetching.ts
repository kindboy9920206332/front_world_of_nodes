import { refresh } from "next/cache"
import { tokenStore } from "./getToken"
import { refreshToken } from "./refreshToken"
import { GET, POUA, POUAF } from "@/types/basicApis"




const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


const fetching = async({request,url , isJwt=true , method }:POUAF) => {
    const getAccess = await tokenStore.getAccess()
    console.log("access:", getAccess)

    console.log(`${baseUrl}${url}`)
    
        let res  =  await fetch (`${baseUrl}${url}` , {
        method,
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
        body:JSON.stringify(request)
    })
    console.log(res)
    if(res.status===401){
    await refreshToken()
    res  =  await fetch (`${baseUrl}${url}` , {
        method,
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
        body:JSON.stringify(request)
    })
    }
    let data =  await res.json()
    return {res  , data}
}






export class apiClient {


get = async({url , isJwt=true}:GET)=> {
        const getAccess = await tokenStore.getAccess()

    console.log(getAccess)
    let res  =  await fetch (`${baseUrl}${url}` , {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
    })
    console.log(res)
    if(res.status===401){
    // await refreshToken()
    res  =  await fetch (`${baseUrl}${url}` , {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
    })
    }
    const data =  await res.json()
    return {res  , data}
}


post = async({request,url , isJwt=true }:POUA)=>{
    console.log({request,url , isJwt})
    const res  =  await fetching({request,url,isJwt , method:"POST"})
    console.log(res)
    return res
}



put = async({request,url , isJwt=true}:POUA)=>{
    const res  =  await fetching({request,url,isJwt , method:"PUT"})
    return res
}




patch = async({request,url ,isJwt=true}:POUA)=>{
    const res  =  await fetching({request,url,isJwt , method:"PATCH"})
    return res
}

delete = async({url , isJwt=true}:GET)=>{
        const getAccess = await tokenStore.getAccess()
    let res  =  await fetch (`${baseUrl}${url}` , {
        method:"Get",
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
    })

    if(res.status===401){
    await refreshToken()
    res  =  await fetch (`${baseUrl}${url}` , {
        method:"Get",
        headers:{
            "Content-Type":"application/json",
            ...(isJwt && {"Authorization":`${getAccess}`})
        },
    })
    }

    const data =  await res.json()
    return {res  , data}
}}