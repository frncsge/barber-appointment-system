import pool from "../../config/dbConfig.js";

export const createWorkHours = async ({
  userId,
  date,
  startTime,
  endTime,
  slotInterval,
}) => {
  try {
    const result = await pool.query(
      `
                INSERT INTO work_hours (user_id, date, start_time, end_time, slot_interval)
                VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
      [userId, date, startTime, endTime, slotInterval],
    );

    return result.rows[0];
  } catch (error) {
    console.error(
      "An error occured while trying to create new work hours:",
      error,
    );
    throw error;
  }
};

export const getWorkHoursById = async (userId) => {
  try {
    const result = await pool.query(
      `
        SELECT 
	        u.account_name AS "barber",
	        wh.*
        FROM work_hours wh
        JOIN users u ON u.id = wh.user_id
        WHERE wh.user_id = $1
        AND wh.date >= CURRENT_DATE
        ORDER BY wh.date ASC;
      `,
      [userId],
    );

    return result;
  } catch (error) {
    console.error(
      "An error occured while trying to get work hours by date:",
      error,
    );
    throw error;
  }
};

export const getWorkHoursByIdAndDate = async (userId, date) => {
  try {
    const result = await pool.query(
      `
        SELECT 
	        u.account_name AS "barber",
	        wh.*
        FROM work_hours wh
        JOIN users u ON u.id = wh.user_id
        WHERE wh.date = $1 AND wh.user_id = $2;
      `,
      [date, userId],
    );

    return result;
  } catch (error) {
    console.error(
      "An error occured while trying to get work hours by date:",
      error,
    );
    throw error;
  }
};

export const updateWorkHoursByIdAndDate = async ({
  userId,
  date,
  keys,
  values,
}) => {
  const setClaus = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

  const query = `
    UPDATE work_hours
    SET ${setClaus}
    WHERE user_id = $${keys.length + 1} AND date = $${keys.length + 2}
    RETURNING *
  `;

  values.push(userId);
  values.push(date);

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(
      "An error occured while trying to update work hours by date:",
      error,
    );
    throw error;
  }
};

export const deleteWorkHoursById = async (workHoursId) => {
  try {
    const result = await pool.query("DELETE FROM work_hours WHERE id = $1", [
      workHoursId,
    ]);

    return result;
  } catch (error) {
    console.error(
      "An error occured while trying to delete work hours by date:",
      error,
    );
    throw error;
  }
};
