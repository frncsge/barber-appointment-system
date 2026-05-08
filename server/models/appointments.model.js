import pool from "../../config/dbConfig.js";

export const getAppointmentsByDate = async (barberId, date) => {
  try {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE user_id = $1 AND date = $2",
      [barberId, date],
    );

    return result.rows;
  } catch (error) {
    console.error("An error occured while trying to get appointments:", error);
    throw error;
  }
};

export const createAppointment = async ({
  barberId,
  date,
  timeSlot,
  customerName,
}) => {
  try {
    await pool.query("INSERT INTO appointments VALUES ($1, $2, $3, $4)", [
      date,
      timeSlot,
      customerName,
      barberId,
    ]);
  } catch (error) {
    console.error(
      "An error occured while trying to create an appointment:",
      error,
    );
    throw error;
  }
};
