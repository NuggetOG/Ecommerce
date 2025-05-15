import { useContext } from "react";
import { currentUserContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const user = currentUser?.user;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10 p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        👋 Welcome, {user?.firstName}!
      </h2>

      <div className="text-center space-y-1 text-gray-700">
        <p className="text-lg">📧 {user?.email}</p>
        <p>📦 Orders: 0</p>
        <p>🛒 Cart Items: {user?.cartCount ?? 0}</p>
        <p>💖 Wishlist Items: {user?.wishlistCount ?? 0}</p>
        <p className="text-sm text-gray-500">
          Joined on {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-2 text-center">
        <Link to="/cart" className="block text-blue-600 hover:underline">
          Go to Cart
        </Link>
        <Link to="/wishlist" className="block text-pink-600 hover:underline">
          View Wishlist
        </Link>
      </div>

      <div className="pt-6 md:pt-10 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
