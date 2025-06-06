import React, { useState } from "react";

export const QtyButton = () => {
  const [quantity, setQuantity ] = useState(0);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex justify-center gap-2 items-center mb-4 mt-2">
      <button
        onClick={decrement}
        className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={increment}
        className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
};
