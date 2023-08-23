import React from 'react'
import profile from '../../assets/icons/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { route } from '../../models/route.model'
import { MdDelete, MdEdit } from '../../utils/icons/index'
import { deleteRecipe } from '../../services/recipesService'

export const RecipeItem = ({ recipes, setShowAlert }) => {
  const navigate = useNavigate()

  const handleDelete = (id) => {
    deleteRecipe(id)
      .then(({ success }) => {
        if (success) {
          setShowAlert(true); setTimeout(() => {
            setShowAlert(false)
          }, 1500);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="md:columns-2 lg:columns-3 2xl:columns-4">
      {
        recipes.map(recipe => (
          <div key={recipe._id} className="relative mb-2 hover:shadow-2xl hover:animate-pulse z-10 cursor-pointer">
            <img src={recipe.imageUrl} alt="pic of recipe" className='rounded-xl' />

            <div className='absolute top-0 right-0 flex flex-wrap gap-2 p-2'>
              <MdEdit size={24} className='text-green-500 rounded-full' onClick={() => navigate(`${route.update.path}/${recipe._id}`)} />
              <MdDelete size={24} className='text-red-500 rounded-full' onClick={() => { handleDelete(recipe._id) }} />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 rounded-bl-xl rounded-br-xl bg-gray-700 bg-opacity-50">
              <Link to={`${route.details.path}/` + recipe._id} className="text-md text-white font-medium font-bubblegum">{recipe.name}</Link>
              <div className='flex flex-row justify-between items-center mt-2'>
                <div className='flex flex-wrap items-center gap-2'>

                  <img src={profile} alt='icon profile' width={30} />
                  <span className='text-white text-sm font-medium font-bubblegum'>{recipe.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
