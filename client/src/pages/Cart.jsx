import { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { getCartItems } from "../api/cart";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../context/authContext";

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(cartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {currentUser} = useContext(currentUserContext);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }})
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        console.log(response.cartItems);
        if (!response.success || !response.cartItems) {
          setError("Failed to load cart");
        } else {
          setCart(response.cartItems);
        }
      } catch (err) {
        console.log(`Error in fetching cart: ${err.message}`);
        setError("Something went wrong in loading cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) {
    return <p className="text-center p-5">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center p-5">{error}</p>;
  }

  if (cart.length === 0) {
    return (
      <div className="text-center p-5">
        <p>Your cart is empty. Explore our store to add some products.</p>
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
      {cart.map((item) => (
        <div key={item.id} className="border rounded p-4 mb-4 shadow-md">
          <h2 className="text-lg font-semibold">{item.product.productName}</h2>
          <img src={item.product.imgUrl} alt={item.product.productName} className="h-24 w-24 object-cover" />
          <p>Size: {item.size.sizeName}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{item.product.price}</p>
        </div>
      ))}
    </div>
  );
};
