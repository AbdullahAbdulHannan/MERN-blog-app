"use client"
import React, { useState } from 'react'
import './posts.css'
import {BsShare} from "react-icons/bs"
import {BiComment, BiLike} from "react-icons/bi"
import axios from 'axios'
import { baseURL } from '@/utils/constant'

// import { Box } from '@chakra-ui/react'
const List = ({id,posts,setUpdateUI,updateMode,user}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (id) => {
    setDropdownOpen(!isDropdownOpen);
  };
 const removePost=()=>{
  axios.delete(`${baseURL}/delete/${id}`).then((res)=>{
    console.log(res);
    setUpdateUI((prevState)=>!prevState)
  })
 }

  return (
    <>
    <li>
    <div className="container ms-24 mb-10">
  <div className="post__card">

  <div className="caret" onClick={() => toggleDropdown(id)} />
                <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                  <div onClick={()=>updateMode(id,posts)}>Edit</div>
                  <div onClick={removePost}>Delete</div>
                </div>
    <div className="post__header">
      <a href="">
        <img src="https://placehold.it/50x50.png" alt="" className=' rounded-full'/>
      </a>
      <div className="post__details">
        <a href="">
          <span className="post__name">{user}</span>
          <br />
        </a>
        <span>
          <a href="">
            <span className="post__timestamp">Yesterday at 10:35</span>
          </a>
          <a href="">
            <span className="post__audience">email</span>
          </a>
        </span>
      </div>
    </div>
    <div className="post__content   mb-24 mt-8">
      <p>
      {posts}
      </p>
    </div>
    <hr />
    <div className="post__actions mt-6 mb-6 ps-10 flex">
      <a href="">
        <span className="action__like pe-6 flex ps-3"><BiLike size='1.5em'/>Like</span>
      </a>
      <a href="">
        <span className="action__comment pe-6 flex"><BiComment size='1.5em'/>Comment</span>
      </a>
      <a href="">
        <span className="action__share pe-6 flex"><BsShare size='1.5em'/>Share</span>
      </a>
    </div>
  </div>
  {/* <div className="post__reactions">
    <a href="#">
      <span>Sourab Reddy, Kiran Shahapur and 18 others</span>
    </a>
  </div> */}
</div>

    </li>

    </>
  )
}

export default List