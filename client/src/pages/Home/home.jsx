import React, { useEffect, useState } from 'react'
import { RecipeItem } from './Items/RecipeItem';
import { getRecipes } from '../../services/recipesService';
import { Filter } from './Items/Filter';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [categorySelected, setCategorySelected] = useState('Todas')

  useEffect(() => {
    getRecipes()
      .then(({ response, success }) => {
        if (success) setRecipes(response)
      })
      .catch(error => {
        new Error(error)
      })
  }, []);

  return (
    <div className="p-10 xl:max-w-[1024px] 2xl:max-w-[1440px] lg:px-20 lg:mx-auto xl:p-0 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className='text-5xl w-full md:w-3/12 xl:w-2/12 font-bold ml-7 sm:ml-0 font-bubblegum'>Recipes</h1>
        <Filter search={search} setSearch={setSearch} />
      </div>
      <div className='flex flex-col xl:flex-row mt-8'>
        <div className='flex mt-5 xl:mt-2'>
          <RecipeItem recipes={recipes} category={categorySelected} search={search} />
        </div>
      </div>
    </div>
  )
}
