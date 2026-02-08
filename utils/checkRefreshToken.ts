import { tokenStore } from "./getToken"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const checkRefershToken  = async()=>{

const getAccess = await tokenStore.getAccess();


if (!getAccess) {
    console.error("No access token found in cookies.");
    return { isExpired: false, status: 401 };
}

try {
    const res = await fetch(`${baseUrl}/user/infoUser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getAccess,  
        },
    });

    console.log(getAccess)

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
        return { isExpired: false, status: res.status };
    } else {
        return { isExpired: true, status: res.status };
    }
} catch (error) {
    console.error("Error fetching data:", error);
    return { isExpired: true, status: 500 };
}

} 