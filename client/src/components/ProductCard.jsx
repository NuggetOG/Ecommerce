import React, { useCallback, useState, useEffect, useContext } from "react";
import { Dropdown } from "./Dropdown";
import { cartContext } from "../context/cartContext";
import { quantityContext } from "../context/quantityContext";
import { createCartItem } from "../api/cart";
import { addToWishlist, deleteWishlistItem, getUserWishlist } from "../api/wishlist";

export const ProductCard = ({ product }) => {
  const { quantity, setQuantity } = useContext(quantityContext);
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(cartContext);

  // Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  // Check if product is in wishlist on mount
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await getUserWishlist();
        if (response.success && response.wishlist) {
          const found = response.wishlist.find(
            (item) => item.product.id === product.id
          );
          if (found) {
            setIsWishlisted(true);
            setWishlistId(found.id);
          } else {
            setIsWishlisted(false);
            setWishlistId(null);
          }
        }
      } catch {
        // ignore
      }
    };
    checkWishlist();
  }, [product.id]);

  const handleWishlistToggle = async () => {
    if (isWishlisted && wishlistId) {
      // Remove from wishlist
      try {
        const response = await deleteWishlistItem(wishlistId);
        if (response.success) {
          setIsWishlisted(false);
          setWishlistId(null);
          alert("Removed from wishlist");
        }
      } catch {
        alert("Failed to remove from wishlist.");
      }
    } else {
      // Add to wishlist
      try {
        const response = await addToWishlist(product.id);
        if (response.success) {
          setIsWishlisted(true);
          setWishlistId(response.wishlistEntry.id);
          alert("Added to wishlist");
        } else if (response.message === "Product already in wishlist") {
          alert("Product is already in your wishlist.");
        }
      } catch {
        alert("Failed to add to wishlist.");
      }
    }
  };

  const addToCart = useCallback(async () => {
    if (sizes.length === 0 || quantity === 0) {
      alert("Please select a size and quantity before adding to cart.");
      return;
    }

    try {
      const sizeId = product.sizes.find((size) => size.sizeName === sizes[0]).id; // Assuming the first size is selected
      const cartItem = await createCartItem({
        productId: product.id,
        sizeId,
        quantity,
      });

      // Update cart state after successful backend call
      setCart((prev) => [...prev, cartItem]);
      console.log("Added to cart:", cartItem);
      alert("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  }, [product, sizes, quantity, setCart]);

  useEffect(() => {
    if (!product || !product.sizes) {
      setError("Error fetching product sizes.");
      setLoading(false);
      return;
    }

    // Extract sizeName from product.sizes
    const extractedSizes = product.sizes.map((size) => size.sizeName);
    setSizes(extractedSizes);
    setLoading(false);
  }, [product, cart]);

  if (loading) {
    return <p className="text-center p-5">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center p-5">{error}</p>;
  }

  if (sizes.length === 0) {
    return (
      <div className="text-center p-5">
        <p>No sizes available for this product.</p>
      </div>
    );
  }

  return (
    <div
      className="bg-gray-100 w-full md:h-1/4 md:w-[500px] justify-items-center m-3 shadow-2xl"
      style={{ fontFamily: '"Bebas Neue", sans-serif' }}
    >
      <img
        className="p-2 hover:border-2 w-full h-[450px] md:h-[490px] hover:h-[520px] mt-1"
        src={product.imgUrl}
        alt={product.name}
      />
      <div className="flex gap-2 mt-2 justify-center">
        <h3 className="antialiased italic mt-1 text-xl">{product.productName}</h3>
        <Dropdown sizes={sizes} />
      </div>
      <div className="flex gap-5 mt-2 justify-center">
        <h3 className="antialiased italic text-xl mt-2">Rs.{product.price}</h3>
      
      </div>
      <button
        style={{ fontFamily: '"Bebas Neue", sans-serif' }}
        onClick={addToCart}
        disabled={quantity === 0}
        title={quantity === 0 ? "Please select a quantity" : ""}
        aria-label="Add to cart"
        className={`bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px] ${
          quantity === 0 ? "cursor-not-allowed" : ""
        }`}
      >
        Add to cart
      </button>
      {/* Embedded Quantity Controls */}
      <div className="flex items-center gap-2 justify-center mb-2 ">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 bg-gray-300 rounded-md"
        >
          -
        </button>
        <span className="">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 bg-gray-300 rounded-md"
        >
          +
        </button>
      </div>
      <button onClick={handleWishlistToggle} aria-label="Toggle wishlist">
        {isWishlisted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        )}
      </button>
    </div>
  );
};