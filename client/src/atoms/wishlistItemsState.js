import { products } from "../data/Products";
import { atom } from "jotai";
import { productWishlistState } from "./productwishliststate";

export const wishlistItemsState = atom((get) => {
  return products
    .filter((product) => get(productWishlistState(product.id))
  );
});
