import { useState } from "react"
import {NavLink} from "react-router-dom" 
import {Menu,X} from "lucide-react"

const NavLinks = () => {
    return (
        <div className="hidden lg:flex gap-3 right-0">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/wishlist" >
                wishlist
            </NavLink>
            <NavLink to="/store">
                Store
            </NavLink>
            <NavLink to="/cart ">
                Cart
            </NavLink>
            <NavLink to="/profile">
                Profile
            </NavLink>
        </div>
    );
};

export const Navbar = ()=>{
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = ()=>{
        setIsOpen(!isOpen)
    }
    return(
        <>
              <nav className="relative right-0 p-4 z-[50]">
            <div>
                <NavLinks />
            </div>
            <div className="flex w-[75px] justify-end lg:hidden">
          <button onClick={toggleMenu}>{isOpen ? <X /> : <Menu />}</button>
            </div>
            </nav>
        {isOpen && <div className="absolute right-4 top-10 w-48 md:hidden bg-[#17181a] border-0 p-4 opacity-50"> 
            <ul>
            <li> <NavLink to="/" className="block">
                Home
            </NavLink></li>
                <li> <NavLink to="/wishlist" className="block">
                wishlist
            </NavLink></li>
                <li><NavLink to="/store" className="block">
                Store
            </NavLink></li>
                <li><NavLink to="/cart" className="block">
                Cart
            </NavLink></li>
                <li>  <NavLink to="/profile" className="block">
                Profile
            </NavLink></li>
            </ul>
             </div>}
        </>
        
    )
}