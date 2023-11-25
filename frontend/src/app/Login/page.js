"use client"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
// import{
//   FaFacebook,FaGoogle,FaGithub
// } from 'react-icons/fa6'
import Link from "next/link";
import { useState,useEffect } from "react";
import {  baseURL2 } from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin, setAuthentication } from "@/utils/auth";
export default function Login() {
  useEffect(()=>{
    const authenticate=async ()=>{
     const loggedIn=await isLogin()
      if(loggedIn){
       router.push("/")
      }
    }
    authenticate()
  },[])
  const router=useRouter()
  // const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPasssword] = useState("")
  const handleSubmit=(e)=>{
        e.preventDefault()
        const payload={
          email,password
        }
        axios.post(`${baseURL2}/login`,payload).then((res)=>{
          setAuthentication(res.data.token) 
          toast.success(
              <div>
                Login Successfully!
              </div>
            )
            router.push("/")
        })
        .catch((err)=>toast.error(err?.response?.data?.message))
  } 
  return (
     <Card color="transparent" shadow={false} className="mt-[4%]  md:ms-[35%]  ml-10 shadow-xl p-8 mb-5 w-fit">
      <Typography variant="h1" color="blue-gray" className="text-center">
        Log in
      </Typography>
      
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e)=>{
               setEmail(e.target.value)
            }}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e)=>{
               setPasssword(e.target.value)
            }}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        
        <Button className="mt-6" fullWidth type="submit"> 
          Log in
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link href="/Signup" className="font-medium text-gray-900">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}