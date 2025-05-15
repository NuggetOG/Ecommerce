import React,{ useCallback ,useState} from "react"
import { QtyButton } from "./QtyButton";
import { Dropdown } from "./Dropdown";
import { Heart } from "./Heart";
import { productWishlistState } from "../atoms/productwishliststate";
import { useAtom } from "jotai";

export const ProductCard = ({ product }) => {
  const [quantity,setQuantity] = useState(0);
  
  const [isWishlisted, setIsWishlisted] = useAtom(productWishlistState(product.id));
  console.log(`is wishlisted :${isWishlisted}`)
  
  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
  },[setIsWishlisted]);

  if (!product) return null;

  return (
    <div className="bg-gray-100 w-full md:h-1/4 md:w-[500px] justify-items-center m-3 shadow-2xl" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
      <img className="p-2 hover:border-2 w-full h-[450px] md:h-[490px] hover:h-[520px] mt-1" src={product.imgUrl} alt={product.name} />
      <div className="flex gap-2 mt-2 justify-center">
        <h3 className="antialiased italic mt-1 text-xl ">{product.productName}</h3>
        <Dropdown />
      </div>
      <div className="flex gap-5 mt-2 justify-center">
      <h3 className="antialiased italic text-xl mt-2">Rs.{product.price}</h3>
      <button className="bg-black rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px] text-white"  style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Buy now</button>
      </div>
      <button className="bg-black rounded-2xl hover:bg-white hover:text-black hover:border-1 p-2 mb-2 w-[90px] h-[40px] text-white"  style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Add to cart</button>
      <QtyButton quantity={quantity} setQuantity={setQuantity} />
      <Heart onClick={toggleWishlist} isActive={isWishlisted} />
    </div>
  );
};