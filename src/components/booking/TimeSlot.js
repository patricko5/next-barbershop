import { useEffect, useState } from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  formatTime,
  calculateBookingTime,
  convertToHours,
} from "/config/convertToHours.config";
import styles from "/styles/booking/TimeSlot.module.css";
import dayjs from "dayjs";

const TimeSlot = ({
  selectedDate,
  setSelectedDate,
  setSelectedTimeSlot,
  setSelectedStaff,
  setSelectedStaffId,
  setBookingTime,
}) => {
  const [staffsAvailability, setStaffsAvailability] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [isToday, setIsToday] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // get time slots
  useEffect(() => {
    const today = dayjs();
    const isTodaySelected =
      selectedDate && dayjs(selectedDate).isSame(today, "day");
    setIsToday(isTodaySelected);

    const getTimeSlotData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/week/${selectedDate.toISOString()}`
        );
        setTimeSlots(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTimeSlotData();
  }, [selectedDate]);

  // get staff availability and booked status
  useEffect(() => {
    const getStaffAvailability = async (timeSlotId) => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/timeslot/${timeSlotId}`
        );
        //console.log("Received staff availability data:", res.data); // Add this line
        setStaffsAvailability(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedTimeSlotId) {
      getStaffAvailability(selectedTimeSlotId);
    }
  }, [selectedTimeSlotId]);

  // handle time slot selection
  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlotId(timeSlot._id);
    setSelectedTimeSlot(timeSlot.startTime);

    const [startTime, endTime] = calculateBookingTime(
      selectedDate,
      timeSlot.startTime
    );
    setBookingTime([startTime, endTime]);
  };

  // handle staff selection
  const handleStaffSelection = (event) => {
    const selectedStaffId = event.target.value;
    const selectedStaff = staffsAvailability.find(
      (staffAvail) => staffAvail.staff._id === selectedStaffId
    );
    const staffName = `${selectedStaff.staff.firstName} ${selectedStaff.staff.lastName}`;
    setSelectedStaff(staffName);
    setSelectedStaffId(selectedStaffId);
  };

  return (
    <div
      className={`${styles.selectTimeWrapper} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <div className={styles.date_wrapper}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            defaultValue={dayjs()}
            disablePast
            orientation="landscape"
            onChange={(newDate) => setSelectedDate(newDate.$d)}
            componentsProps={{
              actionBar: {
                actions: ["today"],
              },
            }}
          />
        </LocalizationProvider>
      </div>

      <div className={styles.child2}>
        <div className={styles.time_wrapper}>
          <h4>Availability</h4>

          <div className={styles.timesContainer}>
            {timeSlots.map((timeSlot) => {
              const currentTime = convertToHours(new Date());
              const isTimePassed = timeSlot.startTime <= currentTime;

              if (isToday) {
                if (!isTimePassed) {
                  return (
                    <div key={timeSlot._id} className={styles.radioL}>
                      <input
                        type="radio"
                        name="time"
                        id={timeSlot._id}
                        value={timeSlot._id}
                        disabled={timeSlot.isFull}
                        onChange={() => handleTimeSlotClick(timeSlot)}
                        className={styles.radioButton}
                      />
                      <label
                        htmlFor={timeSlot._id}
                        className={styles.buttonLabel}
                      >
                        {formatTime(timeSlot.startTime)}
                      </label>
                    </div>
                  );
                }
              } else {
                return (
                  <div key={timeSlot._id} className={styles.radioL}>
                    <input
                      type="radio"
                      name="time"
                      id={timeSlot._id}
                      value={timeSlot._id}
                      disabled={timeSlot.isFull}
                      onChange={() => handleTimeSlotClick(timeSlot)}
                      className={styles.radioButton}
                    />
                    <label
                      htmlFor={timeSlot._id}
                      className={styles.buttonLabel}
                    >
                      {formatTime(timeSlot.startTime)}
                    </label>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {selectedTimeSlotId && (
            <div className={styles.barber_wrapper}>
              <h4>Choose a barber</h4>

              <div className={styles.staff_container}>
                {staffsAvailability.map((staffAvail) => {
                  return (
                    <div key={staffAvail._id} className={styles.radioL}>
                      <input
                        type="radio"
                        name="staff"
                        id={staffAvail._id}
                        value={staffAvail.staff._id}
                        disabled={staffAvail.isBooked}
                        onChange={handleStaffSelection}
                        className={styles.radioButton}
                      />

                      <label
                        htmlFor={staffAvail._id}
                        className={styles.buttonLabel}
                        disabled={staffAvail.isBooked}
                      >
                        {staffAvail.staff.firstName} {staffAvail.staff.lastName}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
