import axios from 'axios';
const baseurl = "http://localhost:5000/api/v1/product"

export const createProduct = async(userData)=>{
    const response = await axios.post(baseurl, userData,{withCredentials:true});
    return response.data;
}

export const getAllProducts = async()=>{
    const response = await axios.get(baseurl,{withCredentials:true});
    return response.data;
}

export const bulkCreateProducts = async(productData)=>{
    const response = await axios.post(`${baseurl}/bulkCreate`,productData,{withCredentials:true});
    return response.data;
}

export const updateProductById = async(productData)=>{
    const response = await axios.put(`${baseurl}/${productData.productId}`);
    return response.data;
}

export const getProductById = async(productData)=>{
    const response = await axios.get(`${baseurl}/${productData.productId}`);
    return response.data;
}

export const deleteProductById = async(productData)=>{
    const response = await axios.delete(`${baseurl}/delete/${productData.productId}`);
    return response.data;
}