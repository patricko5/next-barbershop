import { format } from "date-fns";
import dayjs from "dayjs";

function convertToHours(dateString) {
  const date = new Date(dateString);
  return date.getHours() + date.getMinutes() / 60;
}

const formatTime = (time) => {
  const hour = Math.floor(time);
  const minute = (time - hour) * 60;
  const period = hour < 12 ? "AM" : "PM";
  const formattedHour = hour <= 12 ? hour : hour - 12;
  const formattedMinute = minute === 0 ? "00" : minute;

  return `${formattedHour}:${formattedMinute} ${period}`;
};

const formattedDate = (dateString) =>
  format(new Date(dateString), "yyyy-MM-dd h:mm a");

const calculateBookingTime = (selectedDate, selectedTimeSlot) => {
  const hour = Math.floor(selectedTimeSlot);
  const minute = (selectedTimeSlot - hour) * 60;
  const startTime = dayjs(selectedDate)
    .set("hour", hour)
    .set("minute", minute)
    .format("YYYY-MM-DD HH:mm:ss");
  const endTime = dayjs(startTime)
    .add(30, "minute")
    .format("YYYY-MM-DD HH:mm:ss");
  return [startTime, endTime];
};

module.exports = { convertToHours, formatTime, formattedDate, calculateBookingTime };
