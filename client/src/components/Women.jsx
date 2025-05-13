import { products } from "../data/Products"
import { ProductCard } from "./ProductCard"
export const Women = ()=>{
    return(
        <>
        <div className = "flex flex-wrap gap-1 justify-center items-center p-5">
              {products.filter((product)=> product.category === "Women").map((product)=>
                      <ProductCard product = {product}/> 
              )}        
            </div>
        </>
    )
}