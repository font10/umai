import axios from 'axios'

export async function getUserById ( id ) {
    try {
        const response = await axios.get(`https://umai-api.onrender.com/auth/user/${id}`)
        console.log(response)
        return response
    } catch (err) {
        return { message: 'Error getting user' }
    }  
}

