import React, { useCallback, useState, useEffect, useContext } from "react";
import { QtyButton } from "./QtyButton";
import { Dropdown } from "./Dropdown";
import { Heart } from "./Heart";
import { cartContext } from "../context/cartContext";
import { quantityContext } from "../context/quantityContext";
import { createCartItem } from "../api/cart";


export const ProductCard = ({ product }) => {
  const {quantity, setQuantity} = useContext(quantityContext);
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(cartContext);

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
    console.log("Extracted sizes:", extractedSizes);
    console.log("Cart state:", cart); // Debugging log

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
        <button
          className="bg-black rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px] text-white"
          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
        >
          Buy now
        </button>
      </div>
      <button
        style={{ fontFamily: '"Bebas Neue", sans-serif' }}
        onClick={addToCart}
        disabled={quantity === 0} // Disable if quantity is 0
        title={quantity === 0 ? "Please select a quantity" : ""}
        aria-label="Add to cart"
        className={`bg-black text-white rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px]  ${
          quantity === 0 ? "cursor-not-allowed" : ""
        }`}
      >
        Add to cart
      </button>
      <QtyButton />
      <Heart/>
    </div>
  );
};