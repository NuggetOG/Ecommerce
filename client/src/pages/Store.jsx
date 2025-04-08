import { ProductCard } from "../components/ProductCard"
import { products } from "../data/Products"
export const Store = ()=>{
    return(<div className = "flex flex-wrap gap-1 justify-center items-center p-5">
      {products.map((product)=>
              <ProductCard product = {product}/>
      )}        
    </div>
    )
}