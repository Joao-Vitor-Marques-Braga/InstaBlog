import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthGoogleContext } from "../context/authGoogle";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const { handleClickButtonLoginWithGoogle, registerWithEmailAndPassword, handleEmailLogi, signed } = useContext(AuthGoogleContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerWithEmailAndPassword(name, email, password);
    navigate("/Profile");
  }

  return (
    <div className='items-center flex justify-center'>
      <div className='w-72 h-auto bg-neutral-50 drop-shadow-2xl rounded-xl'>
        <div className='mt-5'>
          <h1 className='text-3xl font-semibold text-center'>Cadastro</h1>
        </div>
        <div className='flex flex-col justify-center mx-auto'>
          <input
            className="m-4 p-1 h-auto bg-slate-300 rounded-md text-base"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='m-4 p-1 h-auto bg-slate-300 rounded-md text-base'
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='m-4 p-1 h-auto bg-slate-300 rounded-md text-base'
            type="password"
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-center my-2'>
          <button 
            className='w-40 h-auto rounded-lg border-solid border-black drop-shadow-2xl shadow-2xl shadow-black hover:bg-neutral-300'
            onClick={handleRegister}
          >
            Cadastrar
          </button>
        </div>
        <div className='text-center my-2'>
          <h1>Ou entre com o Google</h1>
        </div>
        <div className='flex justify-center mb-5'>
          <button 
            className='w-40 h-auto rounded-lg border-solid border-black drop-shadow-2xl shadow-2xl shadow-black hover:bg-neutral-300' 
            onClick={handleClickButtonLoginWithGoogle}
          >
            <FcGoogle className='mx-auto text-4xl p-1' />
          </button>
        </div>
        <div className='text-center my-5'>
          <h3>Já possui uma conta? <a href='/Login' className='text-blue-400'>Clique aqui e entre</a></h3>
        </div>
      </div>
    </div>
  );
}

export default Register