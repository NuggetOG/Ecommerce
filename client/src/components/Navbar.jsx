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
  <div className="absolute right-4 top-10 w-48 lg:hidden bg-[#17181a] border-0 p-4 opacity-50">
    <ul>
      <li><NavLink to="/" className="block">Home</NavLink></li>
      <li><NavLink to="/wishlist" className="block">Wishlist</NavLink></li>
      <li><NavLink to="/store" className="block">Store</NavLink></li>
      <li><NavLink to="/cart" className="block">Cart</NavLink></li>
      {currentUser ? (
        <li><NavLink to="/profile" className="block">Profile</NavLink></li>
      ) : (
        <>
          <li><NavLink to="/login" className="block">Login</NavLink></li>
          <li><NavLink to="/signup" className="block">Signup</NavLink></li>
        </>
      )}
    </ul>
  </div>
)}

        </>
    );
};
