import React, { useEffect, useState } from 'react'
import { getRecipesById } from '../../services/recipesService';
import { useParams } from 'react-router-dom';
import { FormUploadImage } from './Forms/FormUploadImage';
import { FormUpdateRecipe } from './Forms/FormUpdateRecipe';

export const Edit = () => {
  const [recipe, setRecipe] = useState([])
  const [image, setImage] = useState(null)
  const [imageChange, setImageChange] = useState(false)
  const [preview, setPreview] = useState()
  const { id } = useParams()

  useEffect(() => {
    getRecipesById({ id })
      .then(({ response, success }) => {
        if (success) {
          setRecipe(response); setImage(response.imageUrl);
        }
      })
      .catch(error => {
        new Error(error)
      })
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-full justify-center items-center mx-auto'>
        <div className='h-full w-full sm:w-2/5 flex-col justify-center items-center'>
          <FormUploadImage setImage={setImage} preview={preview} image={image} setPreview={setPreview} imageChange={imageChange} setImageChange={setImageChange} />
        </div>
        <div className='w-full sm:w-2/5  flex flex-col p-5'>
          <FormUpdateRecipe
            preview={preview}
            image={image}
            recipe={recipe}
            setRecipe={setRecipe}
          />
        </div>
      </div>
    </div>
  )
}
