import React, { useEffect, useState } from 'react'
import { getRecipesById, updateRecipe } from '../../services/recipesService';
import { useParams } from 'react-router-dom';
import { FormUploadImage } from './Forms/FormUploadImage';
import { ToastContainer } from 'react-toastify';
import { FormUpdateRecipe } from './Forms/FormUpdateRecipe';
import makeAnimated from 'react-select/animated';
import Select from "react-select";
import { addRecipe, uploadImageCloudi } from '../../services/recipesService'
import { Toast } from '../../components/Toast/Toast'
import { useGetUserId } from '../../hooks/useGetUserId/useGetUserId';
import { Zoom, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { categoriesAddList } from '../../utils/constants'
import { IngredientesItem } from './Items/IngredientesItem';
import { InstructionsItem } from './Items/InstructionsItem';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

export const Edit = () => {
  const [recipe, setRecipe] = useState([])
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState()
  const { id } = useParams()
  const userID = useGetUserId();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

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


  const uploadImage = async (evt) => {
    evt.preventDefault()

    if (preview !== undefined) {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", 'anmcssu7')

      try {
        uploadImageCloudi(formData)
          .then(res => {
            if (res.data.secure_url && res.status === 200) {
              recipe.cookingTime = Number(recipe.cookingTime)
              recipe.imageUrl = res.data.secure_url
              createRecipe(recipe)
            }
          })
      } catch (err) {
        toast.error('Error uploading image, try again', {
          position: toast.POSITION.TOP_CENTER,
          className: 'foo-bar text-lg font-medium font-bahnschrift',
          transition: Zoom,
          autoClose: 1500,
          theme: "colored",
        })
      }
    }
    else {
      toast.error('No Image, add one to create a recipe', {
        position: toast.POSITION.TOP_CENTER,
        className: 'foo-bar text-lg font-medium font-bahnschrift',
        transition: Zoom,
        autoClose: 1500,
        theme: "colored",
      })
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRecipe({ ...recipe, [name]: value })
  }

  const handleSelectChange = (optionSelected) => {
    setRecipe({ ...recipe, category: optionSelected.value })
    console.log(recipe)
  };

  const handleIngredientChange = (evt, idx) => {
    const { value } = evt.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients })
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }

  const delIngredient = () => {
    setRecipe({ ...recipe, ingredients: recipe.ingredients.slice(0, recipe.ingredients.length - 1) })
  }

  let ingr;
  if (recipe.ingredients) {
    ingr = recipe.ingredients.map((ingredient, idx) => (
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
  }

  const createRecipe = () => {
    console.log(recipe)
    if (recipe.imageUrl) {
      try {
        updateRecipe(recipe, id)
          .then(res => {
            if (res && res.success) {
              console.log(res)
              /*toast.success('Recipe added successfully', {
                position: toast.POSITION.TOP_CENTER,
                className: 'foo-bar text-lg font-medium font-bahnschrift',
                transition: Zoom,
                autoClose: 1500,
                theme: "colored",
              })
              setTimeout(() => {
                navigate('/')
              }, 2500);*/
            }
          })
      } catch (err) { <Toast type="error" message='Error creating recipe, try again' /> }
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col w-full justify-center items-center mx-auto'>
        <div className='h-full w-full sm:w-2/5 flex-col justify-center items-center'>
          <FormUploadImage setImage={setImage} preview={preview} image={image} setPreview={setPreview} />
        </div>
        <div className='w-full sm:w-2/5  flex flex-col p-5'>
          <ToastContainer />
          <form onSubmit={uploadImage}>
            <div className='flex flex-col'>
              <label htmlFor='name' className='text-[13px] text-gray-500 font-semibold mb-2'>Name</label>
              <input type="text" id="name" placeholder="Enter name of recipe" value={recipe.name} name="name" required className='border p1 text-sm h-[40px] rounded-md ps-3' onChange={handleChange} />
            </div>
            <div className='flex flex-col mt-3'>
              <label htmlFor='category' className='text-[13px] text-gray-500 font-semibold mb-2'>Category</label>
              <Select
                value={{ label: recipe.category, value: recipe.category }}
                required
                name="category"
                options={categoriesAddList}
                classNamePrefix="select"
                components={animatedComponents}
                onChange={handleSelectChange}
              />
            </div>

            <div className='flex flex-col mt-3'>
              <label htmlFor='description' className='text-[13px] text-gray-500 font-semibold mb-2'>Description</label>
              <input type="text" id="description" value={recipe.description} required placeholder="Enter description of recipe" name="description" className='border p1 text-sm h-[40px] rounded-md ps-3' onChange={handleChange} />
            </div>


            <IngredientesItem recipe={recipe} setRecipe={setRecipe} />
            <InstructionsItem recipe={recipe} setRecipe={setRecipe} />

            <div className='flex flex-col'>
              <label htmlFor='cookingTime' className='text-[13px] text-gray-500 font-semibold mt-2 mb-2'>Cooking Time(minutes)</label>
              <input type="number" id="cookingTime" required name="cookingTime" value={recipe.cookingTime} className='border p-1 h-[40px] rounded-md ps-5' onChange={handleChange} />
            </div>
            <button type="submit" className='bg-amber-400 px-6 py-2 rounded-md w-full text-white font-medium mt-3'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}
