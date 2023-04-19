import React from "react";
import CalendarView from "./CalendarView";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ staffId,staffName }) => {
  const [errorMess, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/schedule/details/${staffId}`
        );

        const bookingsWithServiceNames = await Promise.all(
          response.data.map(async (booking) => {
            const service = await getService(booking.service);
            return {
              ...booking,
              serviceName: service ? service.serviceName : "Unknown",
            };
          })
        );

        setBookings(bookingsWithServiceNames);
      } catch (error) {
        setError(true);
        setErrorMessage("Failed to get booking");
        console.error(error);
      }
    };

    if (staffId) {
      getBookings();
    }
  }, [staffId]);

  const getService = async (serviceId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/services/${serviceId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="cont">
      <h1>{staffName} - Dashboard</h1>
      <CalendarView bookings={bookings} />
    </div>
  );
};

export default Dashboard;
