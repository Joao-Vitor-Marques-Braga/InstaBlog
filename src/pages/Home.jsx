import React, { useEffect, useState } from 'react';
import { db } from '../database/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
  }, []);

  return (
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
            <p><strong>Autor:</strong> <Link to={`/user/${post.data.userId}`} className='text-blue-500'>{post.data.userName}</Link></p>
          </div>
        </div>
      ))}
    </div>
  );
}
