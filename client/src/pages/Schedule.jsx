import Navbar from "../components/Navbar.jsx";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate } from "../utils/date.js";
import { formatTime } from "../utils/time.js";
import { GoDotFill } from "react-icons/go";

function Schedule() {
  const { user } = useAuth();

  //   fetch workHours data from database
  const [workHours, setWorkHours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkHours = async () => {
      try {
        const response = await api.get(`/barbers/${user.id}/work-hours`);

        setWorkHours(response.data.workHours);
      } catch (error) {
        setError(error);
      }
    };

    fetchWorkHours();
  }, []);

  // handle form data input
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    slotInterval: "",
  });

  const handleInput = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // handle form submit
  const [submitting, setSubmitting] = useState(false);
  const [submitMesasge, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await api.post("/work-hours", formData);

      alert(response?.data?.message);
    } catch (error) {
      alert(error.response?.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        {/* schedule section */}
        <section>
          {/* for today's schedule */}
          <div className="m-4 p-4 border">
            <h1 className="text-sm font-bold mb-4">Today's Schedule</h1>

            <span className="text-sm text-gray-500">
              {formatDate(workHours[0]?.date)}
            </span>
            <h2 className="text-xl font-bold">
              {formatTime(workHours[0]?.start_time ?? "")} -{" "}
              {formatTime(workHours[0]?.end_time ?? "")}
            </h2>
            <h3 className="font-bold text-lg text-gray-600">
              {workHours[0]?.slot_interval}
              <span className="font-normal text-sm text-gray-500">
                {" "}
                min / haircut
              </span>
            </h3>
          </div>

          {/* for upcoming schedule */}
          <div className="m-4 p-4 border">
            <h1 className="text-sm font-bold mb-4">Upcoming Schedule</h1>

            {/* cards for upcoming schedules */}
            {workHours.slice(1).map((item) => {
              return (
                <div key={item?.id} className="relative pl-4">
                  {/* line */}
                  <div className="absolute h-full w-px bg-gray-400 left-1 top-0" />

                  {/* dot */}
                  <GoDotFill className="absolute -left-1 -top-1 text-gray-400" />

                  {/* content */}
                  <div className="pb-5 cursor-pointer group">
                    {/* date */}
                    <span className="block text-xs text-gray-500">
                      {formatDate(item?.date)}
                    </span>

                    {/* start and end time */}
                    <h2 className="text-sm font-bold group-hover:text-blue-600 group-hover:underline">
                      {formatTime(item?.start_time ?? "")}-{" "}
                      {formatTime(item?.end_time ?? "")}
                    </h2>

                    {/* slot interval or min per haircut */}
                    <h3 className="font-bold text-sm text-gray-600">
                      {item?.slot_interval}
                      <span className="font-normal text-xs text-gray-500">
                        {" "}
                        min / haircut
                      </span>
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* time slots section */}
        <section className="bg-gray-100"></section>

        {/* add schedule section */}
        <section className="bg-gray-100 py-3 flex justify-center items-start">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] max-w-[270px] flex flex-col gap-4 p-3 border bg-white"
          >
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm">
                Date:
              </label>
              <input
                id="date"
                type="date"
                className="border"
                value={formData.date}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="startTime" className="text-sm">
                  Start time:
                </label>
                <input
                  id="startTime"
                  type="time"
                  className="border"
                  value={formData.startTime}
                  onChange={handleInput}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="endTime" className="text-sm">
                  End time:
                </label>
                <input
                  id="endTime"
                  type="time"
                  className="border"
                  value={formData.endTime}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div>
              <label htmlFor="slotInterval" className="text-sm">
                Minutes per haircut:
              </label>
              <input
                id="slotInterval"
                type="number"
                className="w-full border"
                value={formData.slotInterval}
                onChange={handleInput}
              />
            </div>

            <button className="p-2 bg-black text-white text-sm hover:font-medium">
              {submitting ? "Adding..." : "Add New Schedule"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Schedule;
