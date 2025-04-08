import {Logo} from "./Logo"
import { Navbar } from "./Navbar"

export const Header = ()=>{
    return(
        <header className = "bg-[#17181a] sticky top-0 z-[20] w-full flex items-center justify-between  text-amber-100 mt-3">
            <Logo />
            <Navbar />
        </header>
    )
}