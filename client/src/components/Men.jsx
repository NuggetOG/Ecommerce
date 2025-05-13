import { products } from "../data/Products"
import { ProductCard } from "./ProductCard"
export const Men = ()=>{
    return(
        <>
        <div className = "flex flex-wrap gap-1 justify-center items-center p-5">
              {products.filter((product)=> product.category === "Men").map((product)=>
                      <ProductCard product = {product}/> 
              )}        
            </div>
        </>
    )
}