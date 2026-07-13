import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate, formatDateYMD, isToday } from "../utils/date.js";
import { formatTime } from "../utils/time.js";
import { GoDotFill } from "react-icons/go";
import ScheduleMenu from "../components/ScheduleMenu.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

function Schedule() {
  const { user, isLoading } = useAuth();

  //   fetch workHours data from database
  const [workHours, setWorkHours] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSched, setSelectedSched] = useState(null);

  useEffect(() => {
    if (isLoading || !user) return;

    const fetchWorkHours = async () => {
      try {
        const response = await api.get(`/barbers/${user.id}/work-hours`);

        setWorkHours(response.data.workHours);

        if (response.data.workHours.length > 0) {
          const today = response.data.workHours.find((w) => isToday(w.date));

          if (!today?.date) {
            setSelectedSched(null);
            return;
          }

          setSelectedSched(formatDateYMD(today.date));
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchWorkHours();
  }, [user, isLoading]);

  // store schedule for today, if there's any
  const todayWorkHour = workHours.find((w) => isToday(w.date));

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

      setWorkHours((prev) => [...prev, response?.data?.workHours]);

      setSubmitMessage(response?.data?.message);
    } catch (error) {
      setSubmitMessage(error.response?.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  // fetch available time slots and time slots marked unavailable
  const [timeSlots, setTimeSlots] = useState({
    available: [],
    unavailable: [],
  });

  useEffect(() => {
    const fetchAvailable = async () => {
      if (selectedSched === null) return;

      const response = await api.get(
        `/barbers/${user.id}/time-slots?date=${selectedSched}`,
      );

      setTimeSlots((prev) => ({
        ...prev,
        available: response.data?.availableTimeSlots || [],
      }));
    };

    fetchAvailable();
  }, [selectedSched, workHours]);

  // close menu when user clicks outside of it
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-wrapper")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // deleting a schedule
  const [schedToDelete, setSchedToDelete] = useState(null);

  const handleDelete = async () => {
    const response = await api.delete(`/work-hours/${schedToDelete.id}`);

    // update workHours state after deleting
    setWorkHours((prev) => prev.filter((w) => w.id !== schedToDelete.id));

    setSchedToDelete(null);
  };

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        {/* schedule section */}
        <section>
          {/* for today's schedule */}
          <div className="m-4 p-4 border">
            <div className="flex items-start justify-between">
              <h1 className="text-sm font-bold mb-4">Today's Schedule</h1>
              {todayWorkHour && (
                <ScheduleMenu
                  item={todayWorkHour}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  onDelete={() => setSchedToDelete(todayWorkHour)}
                />
              )}
            </div>

            {todayWorkHour ? (
              <div
                className="cursor-pointer group"
                onClick={() =>
                  setSelectedSched(formatDateYMD(todayWorkHour.date))
                }
              >
                <span className="text-sm text-gray-500">
                  {formatDate(todayWorkHour.date)}
                </span>
                <h2 className="text-xl font-bold group-hover:text-blue-600 group-hover:underline">
                  {formatTime(todayWorkHour.start_time ?? "")} -{" "}
                  {formatTime(todayWorkHour.end_time ?? "")}
                </h2>
                <h3 className="font-bold text-lg text-gray-600">
                  {workHours[0]?.slot_interval}
                  <span className="font-normal text-sm text-gray-500">
                    {" "}
                    min / haircut
                  </span>
                </h3>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-sm text-gray-500 p-4 text-center">
                  No schedule set for today.
                </p>
              </div>
            )}
          </div>

          {/* for upcoming schedule */}
          <div className="m-4 p-4 border">
            <h1 className="text-sm font-bold mb-5">Upcoming Schedule</h1>

            {/* cards for upcoming schedules */}
            {workHours.filter((item) => !isToday(item.date)).length > 0 ? (
              workHours
                .filter((item) => !isToday(item.date))
                .map((item) => {
                  return (
                    <div key={item?.id} className="relative pl-4">
                      {/* line */}
                      <div className="absolute h-full w-px bg-gray-400 left-1 top-0" />

                      {/* dot */}
                      <GoDotFill className="absolute -left-1 -top-1 text-gray-400" />

                      {/* content */}
                      <div className="pb-5 flex items-start justify-between">
                        {/* date */}
                        <div
                          className="group cursor-pointer"
                          onClick={() =>
                            setSelectedSched(formatDateYMD(item?.date))
                          }
                        >
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
                        <ScheduleMenu
                          item={item}
                          openMenu={openMenu}
                          setOpenMenu={setOpenMenu}
                          setWorkHours={setWorkHours}
                          onDelete={() => setSchedToDelete(item)}
                        />
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-sm text-gray-500 px-4 pt-1 pb-3 text-center">
                No upcoming schedule set.
              </p>
            )}
          </div>
        </section>

        {/* time slots section */}
        <section className="hidden h-screen bg-gray-100 lg:flex items-start justify-center py-3">
          {/* time slots container */}
          <div className="bg-white border p-4">
            <h1 className="text-sm mb-5">
              Available Time Slots for{" "}
              <span className="font-bold">
                {!selectedSched || isToday(selectedSched)
                  ? "Today"
                  : formatDate(selectedSched)}
              </span>
            </h1>

            <div
              className={`${timeSlots.available.length > 0 ? "grid grid-cols-4 xl:grid-cols-6 gap-3" : "flex items-center justify-center"}`}
            >
              {timeSlots?.available?.length > 0 ? (
                timeSlots?.available?.map((slot) => {
                  return (
                    <div
                      key={slot}
                      className="p-2 border border-black inline-block"
                    >
                      {formatTime(slot)}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 px-4 pt-1 pb-3 text-center">
                  No time slots available because schedule is not set.
                </p>
              )}
            </div>
          </div>
        </section>

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

          {/* modal for deleting schedule */}
          {schedToDelete && (
            <ConfirmModal
              title={`Delete Schedule`}
              description={`Are you sure you want to delete the schedule on ${formatDate(schedToDelete.date)}?`}
              confirmLabel={"Delete"}
              onConfirm={handleDelete}
              onCancel={() => setSchedToDelete(null)}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default Schedule;
