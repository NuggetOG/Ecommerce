import { NavLink, Outlet } from "react-router-dom";

export const Store = () => {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <NavLink to="all" className={({ isActive }) => isActive ? "font-bold" : ""}>All</NavLink>
        <NavLink to="men" className={({ isActive }) => isActive ? "font-bold" : ""}>Men</NavLink>
        <NavLink to="women" className={({ isActive }) => isActive ? "font-bold" : ""}>Women</NavLink>
      </div>
      <Outlet />
    </div>
  );
};
