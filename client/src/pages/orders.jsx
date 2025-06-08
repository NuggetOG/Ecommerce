import { useState, useEffect, useContext } from "react";
import { orderContext } from "../context/orderContext";
import { PrivateRoute } from "../components/PrivateRoute";
import { getUserOrders,cancelOrder } from "../api/order"; // API function to fetch and cancel orders

export const Orders = () => {
  const { order: orders, setOrder } = useContext(orderContext); // Access orders from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders(); // Fetch orders from the backend
        if (response.success) {
          console.log("Orders fetched successfully:", response.orders); // Debugging
          setOrder(response.orders); // Update orders in context
        } else {
          setError(response.message || "Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error); // Log the error for debugging
        setError("Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [setOrder]);

  const handlePayNow = (amount) => {
    console.log(`Initiating payment for order ID: ${amount}`);
    // Add Razorpay integration here
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrder(orderId); // Call API to cancel the order
      if (response.success) {
        alert("Order cancelled successfully!");
        // Remove the cancelled order from the list
        setOrder((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        alert(response.message || "Failed to cancel the order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong while cancelling the order.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <PrivateRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {Array.isArray(orders) &&
              orders.map((order) => (
                <li key={order.id} className="border p-4 rounded">
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p>Status: {order.status}</p>
                  <p>Total: ₹{order.totalPrice}</p>
                  <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <h3 className="text-lg font-bold mt-2">Products:</h3>
                  <ul className="space-y-2">
                    {Array.isArray(order.items) &&
                      order.items.map((item) => (
                        <li key={item.id} className="border p-2 rounded">
                          <p>Product Name: {item.product.productName}</p>
                          <p>Price: ₹{item.product.price}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Size: {item.size?.sizeName || "N/A"}</p>
                          <img
                            src={item.product.imgUrl}
                            alt={item.product.productName}
                            className="w-20 h-20 object-cover mt-2"
                          />
                        </li>
                      ))}
                  </ul>
                  {/* Pay Now and Cancel Order Buttons */}

                  <div className="flex gap-4 mt-4">
                    {order.status === "PENDING" && (
                      <button
                        onClick={() => handlePayNow(order.totalPrice)} 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => handleCancelOrder(order.id)} // Cancel order function
                      disabled={order.status !== "PENDING"} // Disable if not pending
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Cancel Order
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </PrivateRoute>
  );
};