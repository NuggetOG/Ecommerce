import {createContext, useState} from 'react';

export const quantityContext = createContext({
  quantity: 1,
  setQuantity: () => {},
});
export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <quantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </quantityContext.Provider>
  );
};