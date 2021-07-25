const { DateTime } = require("luxon");

module.exports = function readableDate(date) {
  const dateTime =
    date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date);
  return dateTime.toFormat("LLLL dd, yyyy");
};
