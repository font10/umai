import React from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

export const IngredientesItem = ({ recipe, setRecipe }) => {
  console.log(recipe)

  const handleIngredientChange = (evt, idx) => {
    const { value } = evt.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe, ingredients })
  }

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  }

  const delIngredient = () => {
    setRecipe({...recipe, ingredients: recipe.ingredients.slice(0,recipe.ingredients.length - 1)})
  }

  return (
    <div>
      <label htmlFor='ingredients' className='text-[13px] text-gray-500 font-semibold mt-4 mb-2'>Ingredients</label>
      {
        recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
          <div className='flex flex-row justify-center items-center py-1'>
            <input 
              type='text' 
              key={idx} 
              name="ingredients" 
              placeholder='Enter the quantity and the ingredient(200gr rice)' 
              className='border p-1 rounded-md ps-3 text-sm h-[40px] w-full' 
              value={ingredient} 
              required
              onChange={ (evt) => handleIngredientChange(evt, idx) } 
            />
            <button type="button" className='rounded-md text-white font-medium ml-3 w-1/12' onClick={addIngredient}><AiOutlinePlusCircle className='text-emerald-500' size={24} /></button>
            { recipe.ingredients.length > 1 && <button type="button" className='rounded-md text-white font-medium w-1/12' onClick={delIngredient}><AiOutlineMinusCircle className='text-red-500' size={24} /></button> }
          </div>
        ))
      }
      </div>
  )
}
