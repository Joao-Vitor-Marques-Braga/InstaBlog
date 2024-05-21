import { FcGoogle } from "react-icons/fc";


const Register = () => {
  return (
    <div className='w-72 h-96 bg-white drop-shadow-2xl rounded-xl'>
      <div>
        <h1 className='text-3xl font-semibold'>Cadastrar</h1>
      </div>
      <div>
        <input 
          type="text" 
          placeholder='Nome'
          />
        <input 
          type="email"
          placeholder='Email' 
        />
        <input 
          type="password"
          placeholder='Senha' 
        />
      </div>
      <div>
        <h1>Ou entre com o google</h1>
      </div>
      <div>
        <button>
          <FcGoogle />
        </button>
      </div>
      <div>
        <button>Entrar</button>
      </div>
      <div><h3>Já possui conta? <a href='/Login'>Clique aqui para entrar</a></h3></div>
    </div>
  )
}

export default Register