import {useState,useEffect} from 'react';
import { getAllProducts } from '../api/product';
import { ProductCard } from './ProductCard';

export const Women = ()=>{
    const [error,setError]=  useState(null);
    const [loading,setLoading] = useState(true);
    const [products,setProducts] = useState(null);
    useEffect(()=>{
        const fetchProducts = async()=>{
        try{
            const response = await getAllProducts();
            if(!response.success || !response.products){
                setError("failed to load products");
            }
            const women = response.products.filter(
                (product)=> product.category.toLowerCase() === "women"
            );
            setProducts(women);
        }
        catch{
            console.log(`error fetching women products ${error}`);
            setError("something went wrong while loading products");
        }
        finally{
            setLoading(false);
        }
        }
        fetchProducts();
    },[])

    if(loading){
        return(
            <div className='text-center p-5'>
                loading products...
            </div>
        )
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
            <p>No women products available at the moment</p>
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