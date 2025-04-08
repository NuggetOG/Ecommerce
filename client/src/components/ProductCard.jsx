import React,{ useCallback } from "react"
import { Button } from "./Button";
import { ProdImg } from "./ProdImg";
import { CartButton } from "./CartButton";
import { Dropdown } from "./Dropdown";
import { Heart } from "./Heart";
import { productWishlistState } from "../atoms/productwishliststate";
import { useAtom } from "jotai";


export const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useAtom(productWishlistState(product.id));
  console.log(`is wishlisted :${isWishlisted}`)
  
  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
  },[setIsWishlisted]);

  if (!product) return null;

  return (
    <div className="bg-gray-100 w-full md:h-1/4 md:w-[500px] justify-items-center m-3 shadow-2xl">
      <ProdImg url={product.imgUrl} />
      <div className="flex gap-2 mt-2 justify-center">
        <h3 className="antialiased italic mt-1 text-xl">{product.name}</h3>
        <Dropdown />
      </div>
      <div className="flex gap-5 mt-2 justify-center">
      <h3 className="antialiased italic text-xl mt-2">Rs.{product.price}</h3>
      <Button onClick={() => console.log("buying start")} />
        </div>
      <CartButton onClick={() => console.log("carting start")} />
      <Heart onClick={toggleWishlist} isActive={isWishlisted} />
    </div>
  );
};