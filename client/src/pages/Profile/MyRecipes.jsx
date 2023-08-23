import React, { useEffect, useState } from 'react'
import { getRecipesByUser } from '../../services/recipesService';
import { RecipeItem } from './RecipeItem';

export const MyRecipes = () => {
    
  const [recipes, setRecipes] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
  const [msg, setMsg] = useState(false)

  useEffect(() => {    
    getRecipesByUser('font10')
      .then( ({response, success}) => {
        if(success) { setRecipes(response.recipe); setMsg('Borrado correctamente'); }
      })
      .catch(error => {
        new Error(error)
      })  
  }, [showAlert]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'></div>
      <div className='mt-12'>
        { showAlert && <div className='bg-green-200 p-3 rounded-lg w-2/12 mx-auto text-center border-2 border-dashed border-emerald-400'>{msg}</div> }
        <h1 className='mb-8 text-3xl font-semibold font-bubblegum text-semibold'>My Recipes</h1>
        <RecipeItem recipes={recipes} setShowAlert={setShowAlert} />
      </div>
    </div>
  )
}
