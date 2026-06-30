export const formatTime = (time) => {
  const [h, m] = time.split(":");

  const date = new Date();
  date.setHours(h, m);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};
