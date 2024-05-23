import React, { useEffect, useState } from 'react';
import { db } from '../database/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPosts(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));

        // Fetch the user name from one of the posts
        if (querySnapshot.docs.length > 0) {
          setUserName(querySnapshot.docs[0].data().userName);
        }
      }, (error) => {
        console.error("Error fetching user posts: ", error);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-semibold my-4'>{userName}</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
