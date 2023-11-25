"use client"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import{
  FaFacebook,FaGoogle,FaGithub
} from 'react-icons/fa6'
import Link from "next/link";
import { useEffect, useState } from "react";

import {  baseURL2 } from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin } from "@/utils/auth";

export default function Signup() {
  const router=useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPasssword] = useState("")
  useEffect(()=>{
    const authenticate=async ()=>{
     const loggedIn=await isLogin()
      if(loggedIn){
       router.push("/")
      }
    }
    authenticate()
 },[])
  const handleSubmit=(e)=>{
        e.preventDefault()
        const payload={
          name,email,password
        }
        axios.post(`${baseURL2}/signup`,payload).then((res)=>{
            toast.success(
              <div>
                Account Created Successfully!
                <br/>
                Please Login!
              </div>
            )
            router.push("/Login")
        })
        .catch((err)=>toast.error(err?.response?.data?.message))
  } 
  return (
     <Card color="transparent" shadow={false} className="mt-[4%]  md:ms-[35%]  ml-10 shadow-xl p-8 mb-5 w-fit">
      <Typography variant="h1" color="blue-gray" className="text-center">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Create Account
      </Typography>
      <div className="flex items-center gap-4 pt-8 w-fit mx-auto">
        <FaFacebook/>
        <FaGoogle/>
        <FaGithub/>
      </div>
      <p className=" text-center">or<br/> use your email instead</p>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="username"
            value={name}
            onChange={(e)=>{
               setName(e.target.value)
            }}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
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
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth type="submit"> 
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link href="/Login" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}