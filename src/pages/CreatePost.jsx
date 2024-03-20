import React, { useState } from 'react'
import { db, storage } from "../database/firebase"
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const CreatePost = () => {
  const [URL_Image, setURL_Image] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [progress, setProgress] = useState(0)


  const handleUpload = (event) => {
    event.preventDefault()
    const file = event.target[0]?.files[0]
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },

      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setURL_Image(url)
        })
      }

    )
  }

  const postsColelectionRef = collection(db, "posts")

  async function createPost() {
    const post = await addDoc(postsColelectionRef, {
      title,
      description,
      URL_Image
    });
    setTitle("")
    setDescription("")
    setURL_Image("")
  }
  return (
    <div>
      <div className='flex justify-center align-middle font-semibold text-2xl my-5'>
        <h1>Criar Publicação</h1>
      </div>

      <div className='w-80 h-40 flex justify-center align-middle mx-auto '>
        <form onSubmit={handleUpload}>
          <input
            className='block w-full text-sm text-slate-500
              file:mr-4 file:py-4 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-500
              hover:file:bg-purple-700'
            type="file"
            onChange={e => setURL_Image(e.target.value)}
          />
          <button type='submit'
            className='block w-full text-lg font-semibold text-black bg-purple-500 hover:bg-purple-700 rounded-full py-4 my-5'>
            Enviar Imagem
          </button>
        </form>
        {URL_Image && <progress value={progress} max="100" />}
      </div>

      <div className='w-80 h-auto justify-center align-middle mx-auto'>
        <input
          className='w-full bg-slate-200 rounded-lg p-2 text-black my-2'
          type="text"
          placeholder='Título'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className='w-full bg-slate-200 rounded-lg p-2 text-black my-2'
          type="text"
          placeholder='Descrição'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="w-80 h-auto flex justify-center align-middle mx-auto">
        <button 
          className='block w-full text-lg font-semibold text-black bg-purple-500 hover:bg-purple-700 rounded-full py-4 my-5'
          onClick={createPost}>
          Criar post
        </button>
      </div>
    </div>
  )
}
