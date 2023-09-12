import React, { useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select from "react-select";
import { updateRecipe, uploadImageCloudi } from '../../../services/recipesService'
import { Toast } from '../../../components/Toast/Toast'
import { Zoom, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { IngredientesItem } from '../Items/IngredientesItem';
import { InstructionsItem } from '../Items/InstructionsItem';

import { categoriesAddList } from '../../../utils/constants'

export const FormUpdateRecipe = ({ preview, image, recipe, setRecipe }) => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

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
        console.log(optionSelected)
    };

    const createRecipe = () => {
        if (recipe.imageUrl) {
            try {
                console.log(recipe)
                updateRecipe(recipe)
                    .then(res => {
                        console.log(res)
                        if (res && res.status === 200) {
                            toast.success('Recipe updated successfully', {
                                position: toast.POSITION.TOP_CENTER,
                                className: 'foo-bar text-lg font-medium font-bahnschrift',
                                transition: Zoom,
                                autoClose: 1500,
                                theme: "colored",
                            })
                            setTimeout(() => {
                                navigate('/')
                            }, 2500);
                        }
                    })
            } catch (err) { <Toast type="error" message='Error creating recipe, try again' /> }
        }
    }

    return (
        <form onSubmit={uploadImage}>
            <div className='flex flex-col'>
                <label htmlFor='name' className='text-[13px] text-gray-500 font-semibold mb-2'>Name</label>
                <input type="text" id="name" placeholder="Enter name of recipe" name="name" value={recipe.name} required className='border p1 text-sm h-[40px] rounded-md ps-3' onChange={handleChange} />
            </div>
            <div className='flex flex-col mt-3'>
                <label htmlFor='category' className='text-[13px] text-gray-500 font-semibold mb-2'>Category</label>
                <Select
                    defaultValue={categoriesAddList[3]}
                    required
                    name="category"
                    options={categoriesAddList}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={animatedComponents}
                    onChange={handleSelectChange}
                />
            </div>
            <div className='flex flex-col mt-3'>
                <label htmlFor='description' className='text-[13px] text-gray-500 font-semibold mb-2'>Description</label>
                <input type="text" id="description" required placeholder="Enter description of recipe" value={recipe.description} name="description" className='border p1 text-sm h-[40px] rounded-md ps-3' onChange={handleChange} />
            </div>

            <IngredientesItem recipe={recipe} setRecipe={setRecipe} />
            <InstructionsItem recipe={recipe} setRecipe={setRecipe} />

            <div className='flex flex-col xl:flex-row justify-between w-full gap-5'>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label htmlFor='cookingTime' className='text-[13px] text-gray-500 font-semibold mt-2 mb-2'>Cooking Time(minutes)</label>
                    <input type="number" id="cookingTime" required name="cookingTime" value={recipe.cookingTime} className='border p-1 h-[40px] rounded-md ps-5' onChange={handleChange} />
                </div>
                <div className='flex flex-col w-full xl:w-1/2'>
                    <label htmlFor='servers' className='text-[13px] text-gray-500 font-semibold mt-2 mb-2'>Servers</label>
                    <input type="number" id="servers" required name="servers" value={recipe.servers} className='border p-1 h-[40px] rounded-md ps-5' onChange={handleChange} />
                </div>
            </div>
            <button type="submit" className='bg-amber-400 px-6 py-2 rounded-md w-full text-white font-medium mt-3'>
                {
                    loading && <svg aria-hidden="true" role="status" className="inline w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                }
                Save
            </button>
        </form>
    )
}


/*

            <IngredientesItem recipe={recipe} setRecipe={setRecipe} />
            <InstructionsItem recipe={recipe} setRecipe={setRecipe} />
*/