import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../../../assets/icons/profile.png'
import { route } from '../../../models/route.model'

export const RecipeItem = ({ recipes, search }) => {

  return (
    <div className="md:columns-2 lg:columns-3 2xl:columns-4">
      {
        recipes && recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()))
          .map(recipe => (
            <div key={recipe._id} className="relative mb-2 hover:shadow-2xl hover:animate-pulse cursor-pointer">
              <img src={recipe.imageUrl} alt="pic of recipe" className='rounded-xl' />
              <Link to={`${route.details.path}/` + recipe._id} className="absolute bottom-0 left-0 right-0 px-4 py-2 rounded-bl-xl rounded-br-xl bg-gray-700 bg-opacity-50">
                <h3 className="text-md text-white font-semibold font-bahnschrift">{recipe.name}</h3>
                <div className='flex flex-row justify-between items-center mt-2'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <img src={profile} alt='icon profile' width={30} />
                    <span className='text-white text-sm font-medium font-bahnschrift'>{recipe?.userOwner?.username}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
      }
    </div>
  )
}
