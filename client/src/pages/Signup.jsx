import { registerUser, loginUser } from "../api/auth";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/store");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    const registrationData = await registerUser(formData);
    if (!registrationData.success) {
      console.log("Registration failed:", registrationData.message);
      return;
    }
    console.log("User registered successfully:", registrationData);

    const loginResponse = await loginUser({
      email: formData.email,
      password: formData.password,
    });
    console.log("User login successful:", JSON.stringify(loginResponse));

    setCurrentUser(loginResponse);
  } catch (error) {
    console.log("Error in registering user:", error.message);
          toast.error("email already exists"); // Pass the error message directly to the toast

  }
}

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 px-4"
    style={{
      backgroundImage:
        'url("/images/coolest.png")',
    }}>
          <ToastContainer /> {/* Add ToastContainer */}
      <div className=" bg-opacity-20 w-full max-w-md p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-100 hover:text-green-800 text-white py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm">Already a user?</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 text-green-300 hover:text-green-400 underline transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
