import { useState,useContext,useEffect } from "react";
import { loginUser } from "../api/auth";
import { currentUserContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
  const navigate = useNavigate();
  const { currentUser,setCurrentUser } = useContext(currentUserContext);
  
  useEffect(() => {
    if (currentUser) {
      navigate("/store");
    }
  }, [currentUser]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

    async function handleSubmit(e) {
        e.preventDefault();
     try {
      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password
      });
      console.log("User login successful:", JSON.stringify(loginResponse));
      setCurrentUser(loginResponse); // ✅ store it in state
    } catch (error) {
      console.log("Error in registering user:", error.message);
    }
  }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4"
      style={{
        backgroundImage:
          'url("/images/guys3.png")',
      }}>
        <div className=" w-full max-w-md p-8 rounded-xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-200">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Log In
            </button>
          </form>
    
          <div className="text-center">
            <p className="text-sm">New here?</p>
            <button
              onClick={() => navigate("/signup")}
              className="mt-2 text-green-300 hover:text-green-400 underline transition"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    );
    
};
