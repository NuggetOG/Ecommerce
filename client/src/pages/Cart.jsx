import { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { getCartItems, deleteCartItem } from "../api/cart";
import { createOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { orderContext } from "../context/orderContext";

export const Cart = () => {
  const {order,setOrder} = useContext(orderContext);
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCartItems();
        if (!response.success || !response.cartItems) {
          setError("Failed to load cart");
        } else {
          setCart(response.cartItems);
        }
      } catch {
        setError("Something went wrong in loading cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0) {
      setTotal(0);
      return;
    }
    const totalAmount = cart.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
    setTotal(totalAmount);
    console.log("Total amount:", totalAmount);
  }, [cart]);

  const create_order = async () => {
    try {
      const response = await createOrder();
      if (response.success) {
        setOrder(response.order);
        console.log("Order created successfully:", order);
        alert("Order request placed successfully wait for confirmation!");
        //put approve order here for automation
        setCart([]); // Clear cart after successful order
        navigate("/orders"); // Redirect to orders page
      } else {
        setError("Failed to create order");
      }
    } catch {
      setError("Something went wrong in creating order");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const response = await deleteCartItem(cartId);
      if (response.success) {
        setCart((prev) => prev.filter((item) => item.id !== cartId));
      } else {
        setError("Failed to remove item from cart");
      }
    } catch {
      setError("Something went wrong in removing item from cart");
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center border rounded-xl p-6 mb-4 shadow-lg bg-white transition-transform hover:scale-105"
          >
            <img
              src={item.product.imgUrl}
              alt={item.product.productName}
              className="h-40 w-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-center">
              {item.product.productName}
            </h2>
            <p className="mb-1">
              <span className="font-semibold">Size:</span>{" "}
              {item.size.sizeName}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Quantity:</span> {item.quantity}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Price:</span> ₹{item.product.price}
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              onClick={() => removeFromCart(item.id)}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
      {/* Responsive Grand Total */}
      <div className="mt-6 flex flex-col md:flex-row justify-end items-center">
        <span className="text-lg md:text-xl font-bold">
          Grand Total: ₹{total}
        </span>
        <button
          className="ml-0 md:ml-4 mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition"
          onClick={create_order}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};