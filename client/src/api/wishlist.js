import api from './api';

// Add a product to the wishlist
export const addToWishlist = async (productId) => {
  const response = await api.post("/wishlist/add", { productId });
  return response.data;
};

// Get all wishlist items for the current user
export const getUserWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

// Delete a wishlist item by its wishlist entry ID
export const deleteWishlistItem = async (wishlistId) => {
  const response = await api.delete(`/wishlist/delete/${wishlistId}`);
  return response.data;
};