import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <nav className='h-24 flex justify-between mx-12'>
            <div className='my-auto'>
                <Link to="/"><h1 className='text-4xl font-bold'>InstaBlog.</h1></Link>
            </div>

            <div className='my-auto max-md:hidden'>
                <Link className='mx-5 font-medium' to="/">Home</Link>
                <Link className='mx-5 font-medium' to="/CreatePost">Criar Publicação</Link>
            </div>
        </nav>
    )
}