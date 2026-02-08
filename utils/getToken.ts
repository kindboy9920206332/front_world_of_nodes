import Cookies from "js-cookie";


function stripQuotes(s: string) {
  s = s.trim();
  return (s.startsWith('"') && s.endsWith('"')) ? s.slice(1, -1) : s;
}


export const tokenStore = {
  getAccess() {
    console.log("===================? 1")
    return Cookies.get("accesstoken");
  },
  setAccess(token: string) {
    console.log(token)
    Cookies.set("accesstoken", stripQuotes(token) , {expires:1});
  },
  getRefresh() {
    return Cookies.get("refreshtoken");
  },
  setRefresh(token: string) {
    Cookies.set("refreshtoken", stripQuotes(token) ,{expires:7});
  },
  clear() {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
  },
};
