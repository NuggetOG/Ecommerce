import { useContext, useEffect,useState } from "react"
import { cartContext } from "../context/cartContext"
import { getCartItems } from "../api/cart";
import { useNavigate } from "react-router-dom";
export const Cart = ()=>{
    const navigate = useNavigate();
    const {cart,setCart} = useContext(cartContext);
     const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
    useEffect(()=>{
        const fetchCart = async()=>{
        try{
            const response = await getCartItems();
                if(!response.succcess || !response.cartItems){
                    setError("failed to load cart");
                }
                else{
                    setCart(response.cartItems);
                }
        }catch(err){
            console.log(`error in fetching cart:-${err.message}`)
            setError("something went wrong in laoding cart");
        }
         finally{
            setLoading(false);
         }
        }
        fetchCart();
    },[]);

    if(loading){
        return(
            <div>
                <p className ="text-center p-5">loading cart....</p>
            </div>
        )
    }

    if(error){
        return(
            <div>
                <p className="text-center p-5">{error}</p>
            </div>
        )
    }
    if(cart.length === 0){
        return(
            <div>
                <p className="text-center p-5">Your cart is empty.Explore our </p>
                <button  onClick={()=>{navigate("/store")}}>Store</button>
            </div>
        )
    }
    return(
        <>
        <h1>Cart</h1>
        </>
    )
}