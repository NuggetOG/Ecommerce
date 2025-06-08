import api from "./api";
export const processPayment = async(amount)=>{
    const response = await api.post("/pay/payment/process", {amount}, { withCredentials: true });
    if (!response.data.success) {
        throw new Error(response.data.message || "Payment processing failed");
    }   
    return response.data;
}
export const getKey = async () => {
    const response = await api.get("/pay/getkey", { withCredentials: true });
    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch Razorpay key");
    }
    return response.data;
}

