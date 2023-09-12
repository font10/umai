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
  }, []);

  /*if (recipe.ingredients) {
    recipe.ingredients.map((ingredient, idx) => (
      <div className='flex flex-row justify-center items-center py-1'>
        <input
          type='text'
          key={idx}
          name="ingredients"
          placeholder='Enter the quantity and the ingredient(200gr rice)'
          className='border p-1 rounded-md ps-3 text-sm h-[40px] w-full'
          value={ingredient}
          required
          onChange={(evt) => handleIngredientChange(evt, idx)}
        />
        <button type="button" className='rounded-md text-white font-medium ml-3 w-1/12' onClick={addIngredient}><AiOutlinePlusCircle className='text-emerald-500' size={24} /></button>
        {recipe.ingredients.length > 1 && <button type="button" className='rounded-md text-white font-medium w-1/12' onClick={delIngredient}><AiOutlineMinusCircle className='text-red-500' size={24} /></button>}
      </div>
    ))
  }*/


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
