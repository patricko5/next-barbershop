import React, { useEffect, useState } from "react";
import styles from "../../../../styles/PersonalBookings.module.css";
import axios from "axios";

const PersonalBookings = ({ selectedStaff }) => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await axios.get(
          "http://localhost:3000/api/booking"
        );
        setBookings(bookingData.data);

        const serviceData = await axios.get(
          "http://localhost:3000/api/services"
        );
        setServices(serviceData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedStaff]);

  const getServiceName = (id) => {
    const service = services.find((service) => service._id === id);
    return service ? service.serviceName : "N/A";
  };

  const filteredBookings = bookings.filter(
    (booking) => booking.barber === selectedStaff._id
  );

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Client Name</th>
            <th>Barber Name</th>
            <th>Booking Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.customerName}</td>
                <td>
                  {selectedStaff.firstName + " " + selectedStaff.lastName}
                </td>
                <td>{new Date(booking.startTime).toLocaleDateString()}</td>
                <td>{new Date(booking.startTime).toLocaleTimeString()}</td>
                <td>{new Date(booking.endTime).toLocaleTimeString()}</td>
                <td>{getServiceName(booking.service)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noBookingsMessage}>
                No bookings found for {selectedStaff.firstName}{" "}
                {selectedStaff.lastName}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalBookings;
