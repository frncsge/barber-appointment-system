import { CgProfile } from "react-icons/cg";
import { MdSchedule } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import NavItem from "./NavItem.jsx";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      to: "/",
      icon: <RiHomeLine />,
      label: "Home",
    },
    {
      to: "/schedule",
      icon: <MdSchedule />,
      label: "Schedule",
    },
    {
      to: "/appointments",
      icon: <IoCalendarOutline />,
      label: "Appointments",
    },
    {
      to: "/profile",
      icon: <CgProfile />,
      label: "Profile",
    },
  ];

  return (
    <>
      <nav className="w-full bg-black flex items-center justify-between p-4">
        <section>
          <h1 className="text-lg font-bold text-white">Clippointment</h1>
        </section>
        <section>
          {/* desktop nav */}
          <ul className="hidden md:flex flex-row gap-7 text-white ">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </ul>

          {/* mobile nav hamburger button */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <GiHamburgerMenu size={22} />
          </button>
        </section>
      </nav>

      {/* mobile nav */}
      <nav
        className={`bg-black transition-all duration-300 overflow-hidden 
        ${isOpen ? "max-h-64" : "max-h-0"} 
        md:hidden`}
      >
        <ul className="flex flex-col gap-6 px-4 pt-0 pb-6 text-white ">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
