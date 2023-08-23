import axios from 'axios'

export async function getUserById ( id ) {
    try {
        const response = await axios.get(`http://localhost:5000/auth/user/${id}`)
        console.log(response)
        return response
    } catch (err) {
        return { message: 'Error getting user' }
    }  
}

