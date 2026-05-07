import {
  validateDateFormat,
  validateDateValues,
  isPastDate,
} from "../utils/date.util.js";
import { validateTime, generateTimeSlots } from "../utils/time.util.js";
import {
  createAppointment,
  getAppointments,
} from "../models/appointments.model.js";
import { getWorkHoursByIdAndDate } from "../models/workHours.model.js";
import { getUnavailableTimeSlotsByIdAndDate } from "../models/unavailableTimeSlots.model.js";

export const bookAppointment = async (req, res) => {
  const { id: barberId } = req.params;
  const { date, timeSlot, customerName } = req.body;

  if (!date || !timeSlot || !customerName)
    return res.status(400).json({
      message: "Date, time slot, and name are required to book an appointment",
    });

  // check if date is valid and is not a past date
  if (!validateDateFormat(date))
    return res.status(400).json({ message: "Date format must be YYYY-MM-DD" });

  if (!validateDateValues)
    return res
      .status(400)
      .json({ message: "Date must be a number and in a YYYY-MM-DD format" });

  if (isPastDate(date))
    return res
      .status(400)
      .json({ message: "Cannot book an appointment for a past date" });

  // check if time is in correct format
  if (!validateTime(timeSlot))
    return res.status(400).json({ message: "Time format must be HH:MM" });

  try {
    // check if barber has set work hours for this date
    const workHours = await getWorkHoursByIdAndDate(barberId, date);
    if (!workHours.rows[0])
      return res
        .status(400)
        .json({ message: `No work hours have been set for this date` });

    // if yes, check if time slot is available
    const { start_time, end_time, slot_interval } = workHours.rows[0];

    const generatedTimeSlots = generateTimeSlots({
      startTime: start_time,
      endTime: end_time,
      slotInterval: slot_interval,
    });

    // get the time slots marked as unavailable by the barber and time slots that are booked
    const [unavailable, booked] = await Promise.all([
      await getUnavailableTimeSlotsByIdAndDate(barberId, date),
      await getAppointments(barberId, date),
    ]);

    // combine them both using a Set (js like one array but no duplicate values)
    const blocked = new Set([
      ...unavailable.map((slot) => slot.time_slot.slice(0, 5)),
      ...booked.map((slot) => slot.time_slot.slice(0, 5)),
    ]);

    // filter the generated time slots to exclude the blocked ones
    const availableTimeSlots = generatedTimeSlots.filter(
      (slot) => !blocked.has(slot),
    );

    // if inputted time slot is not found in the available time slots
    if (!availableTimeSlots.includes(timeSlot))
      return res.status(400).json({
        message: "Selected time slot is not available",
      });

    // finally, create the appointment nig human sa mga fawking checks
    await createAppointment({ barberId, date, timeSlot, customerName });

    res
      .status(201)
      .json({ message: "Your appointment has been booked successfully!" });
  } catch (error) {
    // duplicate booking
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ message: "Selected time slot is not available" });
    }

    console.error(
      "An error occured while trying to book an appointment:",
      error,
    );
    res.status(500).json({
      message:
        "Server error. An error occured while trying to book an appointment.",
    });
  }
};
