import { Signup } from "./Signup"
import { currentUserContext } from "../context/authContext"
import { useContext } from "react"
export const Profile = ()=>{
    const {currentUser } = useContext(currentUserContext);
    return(
        <>
        {currentUser.user.firstName}
        </>
    )
}