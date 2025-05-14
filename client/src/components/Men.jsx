import { useEffect,useState } from "react"
import { getAllProducts } from "../api/product"
import { ProductCard } from "./ProductCard"
export const Men = ()=>{
    const [products,setProducts] = useState(null);
    const [error,setError] = useState(null);
    const  [loading,setLoading] = useState(true);
    useEffect(()=>{
            const fetchProducts = async()=>{
    try{
            const response = await getAllProducts();
            if(!response.success || !response.products){
                setError("failed to load products");
            }
            else{
                const men = response.products.filter(
                    (product)=> product.category.toLowerCase() === "men"
                );
                setProducts(men);
            }
        }
        catch{
            console.log("cant fetch men products", error.message);
            setError("something went wrong while loading products");
        }
        finally{
            setLoading(false);
        }
    }
    fetchProducts();
    },[])
  
    if (loading) {
        return (
          <div className="text-center p-5">
            <p>Loading products...</p>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="text-center p-5">
            <p className="text-red-500">{error}</p>
          </div>
        );
      }
      if (products.length === 0) {
        return (
          <div className="text-center p-5">
            <p>No men products available at the moment</p>
          </div>
        );
      }    
      return (
        <div className="flex flex-wrap gap-1 justify-center items-center p-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
}