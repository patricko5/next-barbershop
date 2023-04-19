const Week = require("../models/Week");

function generateTimeSlots(start, end, interval) {
  const timeSlots = [];
  for (let time = start; time < end; time += interval) {
    timeSlots.push({ startTime: time });
  }
  //console.log("Generated timeSlots:", timeSlots); // Add console log here
  return timeSlots;
}

function generateDayWithTimeSlots(dayConfig) {
  const { day, start, end, interval } = dayConfig;
  const timeSlots = generateTimeSlots(start, end, interval);
  return { day, timeSlots };
}

async function initializeWeeks(dayConfigs) {
  const weeksCount = await Week.countDocuments();

  if (weeksCount === 0) {
    // Create weeks if they don't exist
    for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
      const days = dayConfigs.map(({ day, start, end, interval }) => {
        const timeSlots = generateTimeSlots(start, end, interval);
        return { day, timeSlots };
      });

      //console.log("Generated days:", days);

      const week = new Week({ weekNumber, days });
      await week.save();
    }
  } else {
    // Update the specific day for each week
    for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
      const week = await Week.findOne({ weekNumber });
      if (week) {
        dayConfigs.forEach(({ day, start, end, interval }) => {
          const timeSlots = generateTimeSlots(start, end, interval);
          const dayIndex = week.days.findIndex((d) => d.day === day);
          if (dayIndex > -1) {
            week.days[dayIndex].timeSlots = timeSlots;
          } else {
            week.days.push({ day, timeSlots });
          }
        });

        // Save the updated week object
        await week.save();
      }
    }
  }
}


module.exports = {
  generateTimeSlots,
  generateDayWithTimeSlots,
  initializeWeeks,
};
