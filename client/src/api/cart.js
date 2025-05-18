import api from './api';

// Get all cart items for the current user
export const getCartItems = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const createCartItem = async (cartData) => {
  const response = await api.post("/cart/create-cart", cartData);
  return response.data;
};

export const updateCartQuantity = async (cartId, body) => {
  const response = await api.put(`/cart/update-quantity/${cartId}`, body);
  return response.data;
};

export const deleteCartItem = async (cartId) => {
  const response = await api.delete(`/cart/delete-cart-item/${cartId}`);
  return response.data;
};