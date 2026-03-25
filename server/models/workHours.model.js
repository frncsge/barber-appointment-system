import pool from "../../config/dbConfig.js";

export const createWorkHours = async ({
  date,
  startTime,
  endTime,
  slotInterval,
}) => {
  try {
    await pool.query(
      `
                INSERT INTO work_hours (date, start_time, end_time, slot_interval)
                VALUES ($1, $2, $3, $4)
            `,
      [date, startTime, endTime, slotInterval],
    );
  } catch (error) {
    console.error(
      "An error occured while trying to create new work hours:",
      error,
    );
    throw error;
  }
};

export const getWorkHoursByDate = async (date) => {
  try {
    const result = await pool.query(
      "SELECT * FROM work_hours WHERE date = $1",
      [date],
    );
    return result.rows[0];
  } catch (error) {
    console.error(
      "An error occured while trying to get work hours by date:",
      error,
    );
    throw error;
  }
};
