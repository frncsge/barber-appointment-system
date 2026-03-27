export const validateTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

export const splitTime = (time) => {
  return time.split(":").map((str) => Number(str));
};

export const validateWorkHour = (startTime, endTime) => {
  const [startHour, startMin] = splitTime(startTime);
  const [endHour, endMin] = splitTime(endTime);

  // invalid if end hour is earlier than start hour
  if (startHour > endHour || (startHour === endHour && startMin >= endMin)) {
    return false;
  }

  return true;
};

export const validateSlotInterval = (slotInterval) => {
  const parsedSlotInterval = Number(slotInterval);
  if (isNaN(parsedSlotInterval) || parsedSlotInterval <= 0) {
    return false;
  }

  return true;
};

export const validateSlotIntervalLength = ({
  startTime,
  endTime,
  slotInterval,
}) => {
  const [startHour, startMin] = splitTime(startTime);
  const [endHour, endMin] = splitTime(endTime);
  const startTotal = startHour * 60 + startMin;
  const endTotal = endHour * 60 + endMin;

  if (endTotal - startTotal < slotInterval) return false;

  return true;
};

export const timeToMinute = (time) => {
  const [hour, minute] = time.split(":").map((str) => Number(str));
  return hour * 60 + minute;
};

export const minuteToTime = (minute) => {
  const h = Math.floor(minute / 60);
  const m = minute % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const addSlotIntervalToTime = (time, slotInterval) => {
  const total = timeToMinute(time) + slotInterval;
  return minuteToTime(total);
};

export const generateTimeSlots = ({ startTime, endTime, slotInterval }) => {
  const slots = [];
  let current = timeToMinute(startTime);
  const end = timeToMinute(endTime);

  while (current + slotInterval <= end) {
    slots.push(minuteToTime(current));
    current += slotInterval;
  }

  return slots;
};