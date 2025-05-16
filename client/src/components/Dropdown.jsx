import { useState, useCallback } from "react";

export const Dropdown = ({ sizes = [] }) => {
    console.log("Dropdown sizes prop:", sizes); // Debugging log
  const [value, setValue] = useState(sizes[0] || ""); // Default to the first size if available

  const handleChange = useCallback((e) => {

    setValue(e.target.value);
  }, []);

  return (
    <div className="p-1 shadow-2xl border-1">
      <select value={value} onChange={handleChange}>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};