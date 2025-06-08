import { useState, useEffect, useContext } from "react";
import { orderContext } from "../context/orderContext";
import { PrivateRoute } from "../components/PrivateRoute";
import { getUserOrders, cancelOrder } from "../api/order"; // API function to fetch and cancel orders
import { getKey, processPayment } from "../api/payment"; // API function for Razorpay integration
import { currentUserContext } from "../context/authContext";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export const Orders = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const { order: orders, setOrder } = useContext(orderContext); // Access orders from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {currentUser} = useContext(currentUserContext); // Access current user from context

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

  

  const handlePayNow = async (amount) => {
    try {
       // Fetch Razorpay key from the backend
      const response = await getKey();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch Razorpay key");
      }
      const key = response.key; // Get the Razorpay key from the response
      console.log("Razorpay key fetched successfully:", key); // Debugging
      const response2 = await processPayment(amount); // Process payment(creating razorpay order)
      if (!response2.success) {
        throw new Error(response2.message || "Payment processing failed");
      } 
      const orderId = response2.order.id; // Get the order ID from the response
      console.log("Payment order created successfully! orderId= ", orderId); // Debugging
      // Proceed with Razorpay payment
      const options = {
        key: key, // Replace with your Razorpay key_id
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, multiply by 100
        currency: "INR",
        name: "blacro",
        description: "order payment",
        order_id: orderId, // Use the order ID from Razorpay

        callback_url: "http://localhost:5000/api/v1/pay/verify", // Your success URL
        prefill: {
          name: currentUser?.user.firstName || "Gaurav Kumar",
          email: currentUser?.user.email || "",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
         handler: async function (response) {
  // This function is called after the payment is completed
  console.log("Payment successful:", response);

  // Extract payment details from the Razorpay response
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

  try {
    // Use axios to call the backend verifyPayment route
    const verifyResponse = await axios.post("http://localhost:5000/api/v1/pay/verify", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },{withCredentials: true}); // Include credentials for session management

    // Handle the backend response
    if (verifyResponse.data.success) {
      alert("Payment verified successfully ! transaction completed successfully!"); // Show success message
      // Redirect to orders.jsx or profile.jsx
      navigate("/orders"); // Use React Router DOM's navigate function
    } else {
      alert("Payment verification failed. Please contact support.");
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    alert("Something went wrong while verifying the payment.");
  }
},
      };
      console.log("Razorpay options:", options); // Debugging
      // Initialize Razorpay and open the payment modal

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error fetching Razorpay key:", error);
      alert("Failed to fetch payment key. Please try again later.");
    }
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