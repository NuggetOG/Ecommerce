import api from "./api";
export const createOrder = async () => {
  try {
    const response = await api.post("/order", {withCredentials: true});
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create order");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: "Failed to create order" };
  }
}
export const getUserOrders = async() =>{
    try {
    const response = await api.get("/order", {withCredentials: true});
    if (!response.data.success){
        throw new Error (response.data.message|| "Failed to fetch orders");
    }
    return response.data;
}
    catch(error){
        console.error("Error fetching orders:", error);
        return { success: false, message: "Failed to fetch orders" };
    }
}
export const cancelOrder = async (orderId)=>{
    try{
    const response = await api.delete(`/order/${orderId}/delete`, {withCredentials: true});
    if(!response.data.success){
        throw new Error(response.data.message || "failed to cancel order");
    }
        return response.data;
    }
    catch(error){
        console.log("Error cancelling order:", error);
        return { success: false, message: "Failed to cancel order" };
    }
}