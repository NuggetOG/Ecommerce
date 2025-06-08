import { useContext } from "react";
import { currentUserContext } from "../context/authContext";
import { cartContext } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { orderContext } from "../context/orderContext";
export const Profile = () => {
  const { order } = useContext(orderContext);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const { cart } = useContext(cartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const user = currentUser?.user;

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg overflow-hidden mt-10 p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center">
        👋 Welcome, {user?.firstName || "User"}!
      </h2>

      <div className="text-center space-y-4 text-gray-700">
        <p className="text-lg font-medium">📧 Email: <span className="font-semibold">{user?.email || "Not Available"}</span></p>
        <p className="text-lg font-medium">📦 Orders: <span className="font-semibold">{order?.length || 0}</span></p>
        <p className="text-lg font-medium">🛒 Cart Items: <span className="font-semibold">{cart?.length ?? 0}</span></p>
        <p className="text-lg font-medium">💖 Wishlist Items: <span className="font-semibold">{user?.wishlist?.length ?? 0}</span></p>
        <p className="text-sm text-gray-500 italic">
          Joined on: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
        </p>
      </div>

      <div className="space-y-4 text-center">
        <Link
          to="/cart"
          className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          🛒 Go to Cart
        </Link>
        <Link
          to="/wishlist"
          className="block bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          💖 View Wishlist
        </Link>
      </div>

      <div className="pt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition duration-200 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};