import React, { useEffect, useState, useContext } from 'react';
import { db } from '../database/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthGoogleContext } from '../context/authGoogle';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthGoogleContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "posts"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-semibold my-4'>Seu perfil</h1>
      {posts ? (
      <div className='grid grid-flow-row justify-center md:grid md:grid-flow-row'>
      {posts.map(post => (
        <div key={post.id} className='max-w-2xl max-h-2xl p-5 mb-12'>
          <div className='w-2xl h-96'>
            <img className='w-full h-full object-cover rounded-md' src={post.data.URL_Image} alt="imagem-referente-ao-post" />
          </div>
          <div>
            <h1 className='font-medium text-xl'>{post.data.title}</h1>
          </div>
          <div>
            <p>{post.data.description}</p>
          </div>
          <div>
           
          </div>
        </div>
      ))}
    </div>
      ) : ( <h1>Você ainda não tem publicações, <Link to="/CreatePost">Criar uma publicação!</Link></h1>)}
    </div>
  );
};

export default Profile;
