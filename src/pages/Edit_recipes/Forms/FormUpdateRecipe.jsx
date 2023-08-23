import React, { useEffect, useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select from "react-select";
import { addRecipe, uploadImageCloudi } from '../../../services/recipesService'
import { Toast } from '../../../components/Toast/Toast'
import { useGetUserId } from '../../../hooks/useGetUserId/useGetUserId';
import { Zoom, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { categoriesList } from '../../../utils/constants'
import { IngredientesItem } from '../Items/IngredientesItem';
import { InstructionsItem } from '../Items/InstructionsItem';

export const FormUpdateRecipe = ({ preview, image, recipe, setRecipe }) => {

    const userID = useGetUserId();
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    console.log(recipe)
    const { category } = recipe
    console.log(category)
    const initialCategories = categoriesList.filter((item, idx) => category.includes(item.value) )


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
        let selected
        optionSelected.length > 0
            ? selected = optionSelected[optionSelected.length - 1]['value']
            : selected = []
        const category = recipe.category;
        category[category.length] = selected;
        setRecipe({ ...recipe, category })
    };

    const createRecipe = () => {
        if (recipe.imageUrl) {
            try {
                addRecipe(recipe)
                    .then(res => {
                        if (res && res.status === 200 && res.statusText === 'OK') {
                            toast.success('Recipe added successfully', {
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
        <div>Hola</div>
    )
}


/*

            <IngredientesItem recipe={recipe} setRecipe={setRecipe} />
            <InstructionsItem recipe={recipe} setRecipe={setRecipe} />
*/