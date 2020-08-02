const { DateTime } = require("luxon");

module.exports = function readableDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toFormat("LLLL dd, yyyy");
};
