import { NavLink } from "react-router-dom";

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        relative flex flex-row items-center gap-1 cursor-pointer
        after:content-['']
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[1px]
        after:bg-white
        after:transition-all
        ${isActive && "after:w-full"}`
      }
    >
      {icon} {label}
    </NavLink>
  );
}

export default NavItem;
