import { createContext } from "react";

export const cartContext = createContext({ cart: null, setCart: () => {} });
