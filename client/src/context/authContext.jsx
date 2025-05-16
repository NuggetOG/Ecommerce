import { createContext, useState, useEffect } from "react";

// Just export the context as you already are
export const currentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

// Here's the provider component
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </currentUserContext.Provider>
  );
};
