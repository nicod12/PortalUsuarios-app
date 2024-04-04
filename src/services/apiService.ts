import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


//get post requests
export const fetchPosts = async () => {
    try {
      const {data} = await axios.get(`${API_URL}?_limit=10`)
      return data;
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async(id: string | number, updatedPost: unknown) => {
    try {
        const {data} = await axios.put(`${API_URL}/${id}`, updatedPost)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async(id: string | number) => {
    try {
        await axios.delete(`${API_URL}/${id}`)
        return id;
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async(newPost: unknown) => {
    try {

     if (typeof newPost !== 'object' || newPost === null) {
          throw new Error('newPost must be an object');
     }
        
     const {data} = await axios.post(API_URL, newPost)    
     return data
    } catch (error) {
        console.log(error)
    }
} 