import cron from "node-cron";
import dbConnect from "../../../util/mongo";
import Staff from "../../../models/Staff";
import Week from "../../../models/Week";

async function createNewTimeSlots() {
  // Your logic to create new time slots
}

async function deleteOldTimeSlots() {
  // Your logic to delete old time slots
}

async function scheduleTasks() {
  await dbConnect();

  // Schedule createNewTimeSlots to run on December 18th at 00:00
  cron.schedule("0 0 18 12 *", async () => {
    console.log("Creating new time slots...");
    await createNewTimeSlots();
  });

  // Schedule deleteOldTimeSlots to run on January 15th at 00:00
  cron.schedule("0 0 15 1 *", async () => {
    console.log("Deleting old time slots...");
    await deleteOldTimeSlots();
  });
}

scheduleTasks();
