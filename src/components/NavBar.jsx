import { Link } from 'react-router-dom'
import { AuthGoogleContext } from '../context/authGoogle'
import { useContext, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/firebase';

export default function NavBar() {
    const { user } = useContext(AuthGoogleContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name)
                }
            }
        }
        fetchUserName();
    }, [user])

    return (
        <nav className='h-24 flex justify-between mx-12'>
            <div className='my-auto'>
                <Link to="/"><h1 className='text-4xl font-bold'>InstaBlog.</h1></Link>
            </div>

            <div className='my-auto max-md:hidden flex flex-row'>
                <Link className='mx-5 font-medium' to="/">Home</Link>
                <Link className='mx-5 font-medium' to="/CreatePost">Criar Publicação</Link>
                <Link className='mx-5 font-medium flex flex-row' to="/Profile">
                    <div className='w-8 h-8 bg-black rounded-full mx-2'></div>
                    {user ? (
                        <>
                            <span>{userName}</span>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </Link>
            </div>
        </nav>
    )
}