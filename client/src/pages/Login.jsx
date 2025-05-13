import { useState,useContext,useEffect } from "react";
import { loginUser } from "../api/auth";
import { currentUserContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    const navigate = useNavigate();
    const { currentUser,setCurrentUser } = useContext(currentUserContext);
    useEffect(()=>{
        if(currentUser);
        navigate("/store");
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
    <div>
      {!currentUser ? (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">login</button>
        </form>
      ) : (
        <p>Welcome {currentUser.user.firstName}</p> 
      )}
    </div>
  );
};
