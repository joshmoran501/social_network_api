const dateFormat = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = dateObj.toLocaleTimeString("en-US");
  return `${date} at ${time}`;
};

module.exports = dateFormat;
