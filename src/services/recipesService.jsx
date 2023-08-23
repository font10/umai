import axios from 'axios'
import getCookie from './cookies';

export async function getRecipes () {
    try {
        const response = await axios.get('http://localhost:5000/recipes');
        if(response.status === 200) {
            return { response: response.data, success: true }
        } 
    } catch (err) {
        return { message: 'Error getting data' }
    }
}

export async function getRecipesByUser ({ author }) {
    try {
        const response = await axios.get('http://localhost:5000/recipes/myRecipes/645a4b106921ecfb0a887f0a');
        if(response.status === 200) {
            return { response: response.data, success: true }
        } 
    } catch (err) {
        return { message: 'Error getting data' }
    }
}

export async function getRecipesById ({ id }) {
    try {
        const response = await axios.get('http://localhost:5000/recipes/' + id);
        if(response.status === 200) {
            return { response: response.data.recipe, success: true }
        } 
    } catch (err) {
        return { message: 'Error getting data' }
    }
}

export async function addRecipe (recipe ) {
    const jwt = getCookie('access_token')
    try {
        const response = await axios.post('http://localhost:5000/recipes', recipe, {
            headers: { authorization: jwt }
        })
        return response
    } catch (err) {
        return { message: 'Error getting data' }
    }  
}

export async function updateRecipe (recipe, id ) {
    const jwt = getCookie('access_token')
    try {
        const response = await axios.put(('http://localhost:5000/recipes/' + id), recipe, {
            headers: { authorization: jwt }
        })
        return response
    } catch (err) {
        return { message: 'Error getting data' }
    }  
}

export async function deleteRecipe (id ) {
    const jwt = getCookie('access_token')
    try {
        const response = await axios.delete('http://localhost:5000/recipes/' + id, {
            headers: { authorization: jwt }
        })
        return { response: response, success: true }
    } catch (err) {
        return { message: 'Error getting data' }
    }  
}

export async function uploadImageCloudi (formData ) {
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dtwzcfryn/image/upload', formData)
        console.log(response)
        return response
    } catch (err) {
        return { message: 'Error getting data' }
    }  
}


