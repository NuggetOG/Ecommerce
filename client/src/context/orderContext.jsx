import { createContext, useState, useEffect } from "react";
import { getUserOrders } from "../api/order"; // Replace with your API function to fetch orders

export const orderContext = createContext({
  order: [],
  setOrder: () => {},
});

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        if (response.success) {
          setOrder(response.orders);
        } else {
          console.error("Failed to fetch orders:", response.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <orderContext.Provider value={{ order, setOrder }}>
      {children}
    </orderContext.Provider>
  );
};

export default OrderProvider;