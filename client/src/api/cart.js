import axios from 'axios';

const baseUrl = "http://localhost:5000/api/v1/cart";

// ✅ Get all cart items for the current user
export const getCartItems = async () => {
  const response = await axios.get(baseUrl, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Add item to cart
export const createCartItem = async (cartData) => {
  // cartData should be { productId, sizeId, quantity }
  const response = await axios.post(`${baseUrl}/create-cart`, cartData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Update quantity of an item in cart
export const updateCartQuantity = async (cartId, body) => {
  // body should be { quantity: number }
  const response = await axios.put(`${baseUrl}/update-quantity/${cartId}`, body, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Delete a cart item
export const deleteCartItem = async (cartId) => {
  const response = await axios.delete(`${baseUrl}/delete-cart-item/${cartId}`, {
    withCredentials: true,
  });
  return response.data;
};
