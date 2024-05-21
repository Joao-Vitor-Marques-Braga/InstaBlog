import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <nav className='h-24 flex justify-between mx-12'>
            <div className='my-auto'>
                <Link to="/"><h1 className='text-4xl font-bold'>InstaBlog.</h1></Link>
            </div>

            <div className='my-auto max-md:hidden flex flex-row'>
                <Link className='mx-5 font-medium' to="/Home">Home</Link>
                <Link className='mx-5 font-medium' to="/CreatePost">Criar Publicação</Link>
                <Link className='mx-5 font-medium flex flex-row' to="/Profile">
                    <div className='w-8 h-8 bg-black rounded-full mx-2'></div> 
                    Perfil
                </Link>
            </div>
        </nav>
    )
}