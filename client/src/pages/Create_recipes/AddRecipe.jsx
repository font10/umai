import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { FormUploadImage } from './Forms/FormUploadImage'
import { FormAddRecipe } from './Forms/FormAddRecipe'
import 'react-toastify/dist/ReactToastify.css';

export const AddRecipe = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()

  
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-full justify-center items-center mx-auto'>
        <div className='h-full w-full sm:w-2/5 flex-col justify-center items-center'>
          <FormUploadImage setImage={setImage} preview={preview} image={image} setPreview={setPreview} />
        </div>
        <div className='w-full sm:w-2/5  flex flex-col p-5'>
          <ToastContainer />
          <FormAddRecipe
            preview={preview}
            image={image}
          />
        </div>
      </div>
    </div>
  )
}