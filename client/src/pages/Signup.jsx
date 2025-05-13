import { registerUser, loginUser } from "../api/auth";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserContext } from "../context/authContext";

// ... your component function



export const Signup = () => {

const navigate = useNavigate();
const { currentUser,setCurrentUser } = useContext(currentUserContext);

useEffect(() => {
  if (currentUser) {
    navigate("/store");
  }
}, [currentUser]);

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
      console.log("User registered successfully:", registrationData);

      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password
      });
      console.log("User login successful:", JSON.stringify(loginResponse));

      setCurrentUser(loginResponse);
    } catch (error) {
      console.log("Error in registering user:", error.message);
    }
  }
  return (
    <div>
  
        <form onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit">Register</button>
        </form>
    </div>
  );
};
