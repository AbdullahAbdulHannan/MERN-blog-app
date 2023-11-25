import axios from "axios"
import cookie from "js-cookie"
import { baseURL2 } from "./constant"
export const setCookie=(key,value)=>{
       cookie.set(key,value,{expires:2})   
}
export const getCookie=(key)=>{
       return cookie.get(key)   
}
export const removeCookie=(key)=>{
       cookie.set(key)   
}
export const setAuthentication=(token)=>{
       setCookie("token",token)   
}
export const logout=()=>{
       removeCookie("token")   
}
export const isLogin=async()=>{
    const token=getCookie("token");
    if(token){
        const res=await axios.post(`${baseURL2}/auth`,{token})
        return res.data;
    }
    return false;
}
