import { useAtomValue } from "jotai";
import { wishlistItemsState } from "../atoms/wishlistItemsState";
import { ProductCard } from "../components/ProductCard";

export const Wishlist = () => {
  const wishlist = useAtomValue(wishlistItemsState);
  
  return (<>
      <h1 className="font-extrabold ">Wishlist: </h1>
  <div className = "flex flex-wrap gap-1 justify-center items-center p-3">
        {wishlist.map((product)=>
                <ProductCard product = {product}/>
        )}        
      </div>
      </>
  );
};
