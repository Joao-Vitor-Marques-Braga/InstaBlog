import React, { useEffect, useState } from 'react'
import { db } from '../database/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore';


export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "posts"));
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc => ({
                data: doc.data()
            })))
        })
    }, [])

    return (
        <div className='grid grid-flow-row justify-center md:grid md:grid-flow-row'>
            {
                posts.map(function (e) {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <>
                            <div className='max-w-2xl max-h-2xl p-5 mb-12'>
                                <div className='w-2xl h-96'>
                                    <img className='w-full h-full object-cover rounded-md' src={e?.data?.URL_Image} alt="imagem-referente-ao-post" />
                                </div>
                                <div>
                                    <h1 className='font-medium text-xl'>{e?.data?.title}</h1>
                                </div>
                                <div>
                                    <p>{e?.data?.description}</p>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}