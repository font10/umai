import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillPrinter, AiFillStar, AiOutlineShareAlt, AiOutlineStar, BiTimeFive, GiForkKnifeSpoon, MdFavoriteBorder } from '../../utils/icons'
import { getRecipesById } from "../../services/recipesService";

export const DetailsRecipe = () => {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    getRecipesById({id})
      .then( ({response, success}) => {
        if(success) setRecipe(response)
      })
      .catch(error => {
        new Error(error)
      })  
  }, []);

  const ingredientsOne = recipe.ingredients?.slice(0, (recipe.ingredients.length / 2))
  const ingredientsTwo = recipe.ingredients?.slice((recipe.ingredients.length / 2), recipe.ingredients.length)

  return (
    <div className="flex flex-col justify-center mx-auto max-w-[1280px] mt-5">
      <div className="flex flex-col w-full sm:w-4/6  justify-center items-center mx-auto">
        <h1 className="font-bahnschrift text-5xl font-semibold">{recipe.name}</h1>
        <h2 className="flex justify-center text-center font-semibold font-bahnschrift mt-7 text-gray-800">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500</h2>
      </div>
      <div className="mt-5 sm:mt-10 flex justify-center mx-auto xl:w-4/6">
        <img src={recipe.imageUrl} alt="pic of recipe" className="rounded-[30px] sm:rounded-3xl h-auto w-full p-5 sm:p-0 sm:w-4/6 xl:w-full" />
      </div>

      <div className="flex flex-row justify-between items-center mx-auto mt-10 sm:w-4/6">
        <div className="flex flex-row gap-3">
          <div>
            <img src={recipe.imageUrl} width={75} height={75} alt="" className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-lg">David Font</div>
            <div className="text-sm text-gray-700 font-medium">CEO de Umai</div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <MdFavoriteBorder size={28} />
          <AiFillPrinter size={28} />
          <AiOutlineShareAlt size={28} />
        </div>
      
      </div>
      <div>
        <hr className="w-4/6 mx-auto border-[1px] border-gray-300 mt-6" />
      </div>

      <div className="flex flex-row w-4/6 mx-auto mt-4 p-2">
        <div className="w-1/2 flex flex-row justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <GiForkKnifeSpoon size={20} />
            <span className="text-md font-bold">{recipe.servers} personas</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <BiTimeFive size={20} />
            <span className="text-md font-bold">{recipe.cookingTime} personas</span>
          </div>
        </div>
        <div className="w-1/2 flex flex-row justify-end items-center">
          <AiFillStar size={18} />
          <AiFillStar size={18} />
          <AiFillStar size={18} />
          <AiFillStar size={18} />
          <AiOutlineStar size={18} />
          <span className="ml-2 font-bahnschrift font-semibold text-sm">4 (205 votos)</span>
        </div>
      </div>

      <div className="flex flex-col w-4/6 mx-auto justify-start text-start items-start mb-5">
        <h1 className="font-bold text-3xl font-bahnschrift mt-12">Ingredientes</h1>
        <div className="w-full grid grid-flow-col gap-x-8 mt-4">
          <div className="">
            { 
              ingredientsOne?.map( item => (
                <div className="w-full py-1">
                  <span className="font-medium font-bahnschrift text-gray-800">{item}</span>
                  <hr className="mt-2" />
                  </div>
              ))
            }
          </div>
          <div className="">
          { 
            ingredientsTwo?.map( item => (
              <div className="w-full py-1">
                <span className="font-medium font-bahnschrift text-gray-800">{item}</span>
                <hr className="mt-2" />
                </div>
            ))
          }
        </div>
        </div>
      </div>

      <div className="flex flex-col w-4/6 mx-auto justify-start text-start items-start mb-5">
        <h1 className="font-bold text-3xl font-bahnschrift mt-8">Preparación</h1>
        <div className="mt-4">
          { 
            recipe.instructions?.map( (item, idx) => (
              <div>
                <div className="flex flex-row gap-3 text-left w-full py-2">
                  <div>{idx + 1}.</div>
                  <div className="text-left font-medium font-bahnschrift text-gray-800">{item}</div>
                </div>
                <div>
                  <hr className="mt-2" />
                </div>
              </div>
            ))
          }
        </div>
      </div>


    </div>
  );
}

