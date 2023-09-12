import axios from 'axios'
import getCookie from './cookies';

export async function getRecipes () {
    try {
        const response = await axios.get('https://umai-api.onrender.com/recipes');
        if(response.status === 200) {
            return { response: response.data, success: true }
        } 
    } catch (err) {
        return { message: 'Error getting data' }
    }
}

export async function getRecipesByUser ( id ) {
    try {
        console.log(id)
        const response = await axios.get('https://umai-api.onrender.com/recipes/myRecipes/' + id);
        console.log(response)
        
        if(response.status === 200) {
            return { response: response.data, success: true }
        } 
    } catch (err) {
        return { message: 'Error getting data' }
    }
}

export async function getRecipesById ({ id }) {
    try {
        const response = await axios.get('https://umai-api.onrender.com/recipes/' + id);
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
        const response = await axios.post('https://umai-api.onrender.com/recipes', recipe, {
            headers: { authorization: jwt }
        })
        return response
    } catch (err) {
        return { message: 'Error getting data' }
    }  
}

export async function updateRecipe (recipe) {
    const id = recipe._id
    const jwt = getCookie('access_token')
    try {
        const response = await axios.put(('https://umai-api.onrender.com/recipes/' + id), recipe, {
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
        const response = await axios.delete('https://umai-api.onrender.com/recipes/' + id, {
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


