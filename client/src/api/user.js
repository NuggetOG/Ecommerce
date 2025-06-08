import axios from 'axios';
const baseUrl = 'http://localhost:5000/api/v1/user';

export const getUserProfile = async () => {
  const response = await axios.get(`${baseUrl}/`, {
    withCredentials: true, // ✅ so cookie (token) is sent
  });
  console.log(`response :- ${response.data}`);
  return response.data;
};
