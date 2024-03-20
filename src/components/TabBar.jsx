import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

export default function TabBar() {

    return (
        <div className='fixed -bottom-1  w-full bg-neutral-100 border-solid border-y border-t-black h-14 flex justify-between md:hidden'>
            <div className='my-auto flex'>
                <Link className='mx-20 text-2xl' to="/"><FaHome className='shadow-2xl text-black'/></Link>
            </div>
            <div className='my-auto flex'>
                <Link className='mx-20 text-2xl' to="/CreatePost"><FaCirclePlus className='shadow-2xl text-black'/></Link>
            </div>
        </div>
    )
}