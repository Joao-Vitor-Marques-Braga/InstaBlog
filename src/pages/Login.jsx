import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";
import { AuthGoogleContext } from '../context/authGoogle';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { handleClickButtonLoginWithGoogle, signed } = useContext(AuthGoogleContext)

  if (!signed){
    return (
      <div className='items-center flex justify-center'>
        <div className='w-72 h-96 bg-neutral-50 drop-shadow-2xl rounded-xl'>
          <div className='mt-5'>
            <h1 className='text-3xl font-semibold text-center'>Login</h1>
          </div>
          <div className='flex flex-col justify-center mx-auto'>
            <input
              className='m-4 p-1 h-auto bg-slate-300 rounded-md text-base'
              type="email"
              placeholder='Email'
            />
            <input
              className='m-4 p-1 h-auto bg-slate-300 rounded-md text-base'
              type="password"
              placeholder='Senha'
            />
          </div>
          <div className='flex justify-center my-2'>
            <button className='w-40 h-auto rounded-lg border-solid border-black drop-shadow-2xl shadow-2xl shadow-black hover:bg-neutral-300'>Entrar</button>
          </div>
          <div className='text-center my-2'>
            <h1>Ou entre com o google</h1>
          </div>
          <div className='flex justify-center mb-5'>
            <button className='w-40 h-auto rounded-lg border-solid border-black drop-shadow-2xl shadow-2xl shadow-black hover:bg-neutral-300' onClick={() => handleClickButtonLoginWithGoogle()}>
              <FcGoogle className='mx-auto text-4xl p-1' />
            </button>
          </div>
          <div className='text-center my-5'>
            <h3>Não possui conta? <a href='/Register' className='text-blue-400'>Clique aqui e cadastre-se</a></h3>
          </div>
        </div>
      </div>
    )
  } else{
    return <Navigate to="/Profile"/>
  }
}

export default Login