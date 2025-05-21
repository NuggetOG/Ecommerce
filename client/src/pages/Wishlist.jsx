import React, { useEffect, useState } from "react";
import { getUserWishlist, deleteWishlistItem } from "../api/wishlist";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getUserWishlist();
        // Adjust for your backend response shape:
        // response.wishlistItems is correct, not response.wishlist
        if (response.success && response.wishlistItems) {
          setWishlist(response.wishlistItems);
        } else {
          setError("Failed to load wishlist");
        }
      } catch (err) {
        setError("Something went wrong while loading wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (wishlistId) => {
    try {
      const response = await deleteWishlistItem(wishlistId);
      if (response.success) {
        setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
      } else {
        setError("Failed to remove item from wishlist");
      }
    } catch {
      setError("Something went wrong while removing item");
    }
  };

  if (loading) {
    return <p className="text-center p-5">Loading wishlist...</p>;
  }

  if (error) {
    return <p className="text-center p-5 text-red-500">{error}</p>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center p-5">
        <p>Your wishlist is empty. Explore our store to add some products.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/store")}
        >
          Go to Store
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center border rounded-xl p-6 mb-4 shadow-lg bg-white transition-transform hover:scale-105"
          >
            <img
              src={item.product.imgUrl}
              alt={item.product.productName}
              className="h-40 w-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-center">{item.product.productName}</h3>
            <p className="mb-2"><span className="font-semibold">Price:</span> ₹{item.product.price}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              onClick={() => handleRemove(item.id)}
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};