import { validateDateInput } from "../validators/date.validator.js";
import { getWorkHoursByDate } from "../models/workHours.model.js";

export const getAvailableTimeSlots = async (req, res) => {
  const { date } = req.params;

  const error = validateDateInput(date);

  if (error) res.status(400).json({ message: error });

  try {
    const workHours = await getWorkHoursByDate(date);

    // generate time slots based on work hours + slot interval 
    
  } catch (error) {
    console.error(
      "An error occured while trying to get available time slots:",
      error,
    );
    res.status(500).json({
      message:
        "Server error. An error occured while trying to get available time slots.",
    });
  }
};
