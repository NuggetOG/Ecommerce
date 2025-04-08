import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const productWishlistState = atomFamily(
  (id) => atom(false),
  (a, b) => (a===b)
)

