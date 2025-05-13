import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/v1/auth';

export const registerUser = async(userData)=>{
    const response = await axios.post(`${baseUrl}/register`, userData,{
        withCredentials:true,
    })
    return response.data;
}

export const loginUser = async(userData)=>{
    const response = await axios.post(`${baseUrl}/login`, userData,{
        withCredentials:true,
    })
    return response.data;
}

