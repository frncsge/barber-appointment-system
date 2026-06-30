import { BsThreeDots } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import api from "../api/axios.js";

function ScheduleMenu({ item, openMenu, setOpenMenu, setWorkHours, onDelete }) {
  return (
    <div className="relative menu-wrapper">
      <BsThreeDots
        size={20}
        onClick={() =>
          setOpenMenu((prev) => (prev === item.date ? null : item.date))
        }
        className={`cursor-pointer ${openMenu === item.date ? "text-gray-500" : "text-black"}`}
      />

      {openMenu === item.date && (
        <div className="absolute top-4 right-1 border bg-white">
          <button className="text-gray-500 text-sm hover:underline flex items-center justify-center gap-2 py-1 px-2">
            <AiFillEdit /> Edit
          </button>
          <button
            className="text-red-500 text-sm flex hover:underline items-center justify-center gap-2 py-1 px-2"
            onClick={onDelete}
          >
            <MdDelete /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ScheduleMenu;
