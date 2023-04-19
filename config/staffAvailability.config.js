import Week from "../models/Week";

async function addStaffToAvailability(staffId) {
  const weeks = await Week.find();

  weeks.forEach(async (week) => {
    week.days.forEach((day) => {
      day.timeSlots.forEach((timeSlot) => {
        timeSlot.staffAvailability.push({ staff: staffId, isBooked: false });
      });
    });
    await week.save();
  });
}

const checkAndUpdateIsFull = (timeSlot) => {
  const allStaffBooked = timeSlot.staffAvailability.every(
    (availability) => availability.isBooked
  );
  if (allStaffBooked) {
    timeSlot.isFull = true;
  }
  return timeSlot;
};


module.exports = {
  addStaffToAvailability,
  checkAndUpdateIsFull,
};
