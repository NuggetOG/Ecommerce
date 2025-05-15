import { useState,useContext } from "react"
import { NavLink } from "react-router-dom" 
import { Menu, X } from "lucide-react"
import { currentUserContext } from "../context/authContext";


const NavLinks = () => {
    const { currentUser } = useContext(currentUserContext);
  
    return (
      <div className="hidden lg:flex gap-3 right-0">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        {currentUser ? (
          <NavLink to="/profile">Profile</NavLink>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    );
  };
  

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { currentUser } = useContext(currentUserContext);

    return (
        <>
            <nav className="relative right-0 p-4 z-[50]">
                <div>
                    <NavLinks />
                </div>
                <div className="flex w-[75px] justify-end lg:hidden">
                    <button onClick={toggleMenu}>{isOpen ? <X /> : <Menu />}</button>
                </div>
            </nav>

            {isOpen && (
  <div className="absolute right-4 top-14 w-64 lg:hidden bg-black/90 opacity-70 rounded-xl p-6 shadow-xl backdrop-blur-md space-y-4 text-white text-lg z-50 transition-all">
    <ul className="space-y-3">
      <li><NavLink to="/" className="block hover:text-gray-300">Home</NavLink></li>
      <li><NavLink to="/wishlist" className="block hover:text-gray-300">Wishlist</NavLink></li>
      <li><NavLink to="/store" className="block hover:text-gray-300">Store</NavLink></li>
      {currentUser ? (
        <li><NavLink to="/profile" className="block hover:text-gray-300">Profile</NavLink></li>
      ) : (
        <>
          <li><NavLink to="/login" className="block hover:text-gray-300">Login</NavLink></li>
          <li><NavLink to="/signup" className="block hover:text-gray-300">Signup</NavLink></li>
        </>
      )}
    </ul>
  </div>
)}


        </>
    );
};
