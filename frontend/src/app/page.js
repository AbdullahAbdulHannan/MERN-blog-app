"use client"
import List from '@/components/List'
import { isLogin, logout } from '@/utils/auth'
import { baseURL } from '@/utils/constant'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const App = () => {
  const [input, setinput] = useState('')
  const [post, setPost] = useState([])
  const [user,setUser]=useState({name:'',email:''})
  const[updateUI,setUpdateUI]=useState(false)
  const[updateid,setUpdateid]=useState(null)
  const route=useRouter()
  //!!!!!!!!!!!!!!!!!!!!!!use effect pora karna aur email aur name ka prps list main send krna 
  useEffect(()=>{
     const authenticate=async ()=>{
      const loggedIn=await isLogin()
       if(loggedIn.auth){
        setUser(loggedIn.data)
       }
       else{
        route.push('/Login')
       }
     }
     authenticate()
  },[])
  const handleLogout=()=>{
    logout()
    toast.success('Logout Successfully!')
    route.push('/Login')
  }
  useEffect(()=>{
       axios.get(`${baseURL}`)
       .then((res) => {
        const data = res.data;
        const user = data.user; 
  console.log(user);
  console.log(data.user);
        setPost(data);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  },[updateUI])
  const addPost=()=>{
    axios.post(`${baseURL}/post`,{post:input}).then((res)=>{
      console.log(res.data);
      setinput("")
      setUpdateUI((prevState)=>!prevState)
      setUpdateid(null) 
    })
  }
  const updateMode=(id,post)=>{
        console.log(post);
        setinput(post)
        setUpdateid(id)
  }
  const updatePost=()=>{
    axios.put(`${baseURL}/update/${updateid}`,{post:input}).then((res)=>{
      console.log(res.data);
      setinput("")
      setUpdateUI((prevState)=>!prevState)
    })
  }
//  const abc=post.user.findbyId(id).populate.exec()
// console.log(post);
  return (
    <>
      <main className='bg-[#020617]'>
      <div className=' p-5 bg-orange-300 text-white flex justify-end '>
        <p>HI!{user?.name}<br/>{user?.email}</p>
    <Link className=' pe-28' href={'/Login'}>Login</Link>
    <Link className=' pe-28' href={'/Signup'}>About</Link>
    <Link className=' pe-28' href={'/Blogs'}>Blogs</Link>
    <Link className=' pe-28' href={'/Contacts'}>Contacts</Link>
    <button className=' bg-blue-900 text-white' onClick={handleLogout} >Logout</button>
    </div>

        <h1 className=' text-4xl text-center font-bold'>CRUD OPERATION</h1>
        <div className="md:flex md:items-center mb-6">
       <div className=" w-2/3 ms-[100px] inputHolder">
       <textarea className="resize-none  appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-56" id="inline-full-name " type="text" value={input} onChange={(e)=>setinput(e.target.value)}></textarea>
       </div>
       </div>
      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded me-96 float-right" type="submit" onClick={updateid?updatePost:addPost}>
        {updateid?"Update":"Post"}
      </button>

        <ul className=' mt-28'>
          {
          post.map((post)=>(
            <List key={post._id} id={post._id} posts={post.post}  setUpdateUI={setUpdateUI} updateMode={updateMode} user={post.user}/>
        ))
      }
        </ul>
  </main>
  </>
  )
}

export default App
       