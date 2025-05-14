import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "../api/product";

export const All = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();

        if (!response.success || !response.products) {
          setError("Failed to load products");
        } else {
          setProducts(response.products);
        }
      } catch (err) {
        console.error("Error fetching unisex products:", err);
        setError("Something went wrong when loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <p>No unisex products available at the moment</p>
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
};
