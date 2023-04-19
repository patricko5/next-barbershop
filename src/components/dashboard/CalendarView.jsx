import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const mapBookingsToEvents = (bookings) => {
  return bookings.map((booking) => ({
    title: booking.customerName,
    start: new Date(booking.startTime),
    end: new Date(booking.endTime),
    desc: (
      <>
        Service Name: {booking.serviceName}
        <br />
        Customer notes: {booking.notes}
      </>
    ),
  }));
};

export default function CalendarView({ bookings }) {
  const events = mapBookingsToEvents(bookings);

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          agenda: {
            event: ({ event }) => (
              <div>
                <strong>{event.title}</strong>
                <br />
                {event.desc}
              </div>
            ),
          },
        }}
      />
    </div>
  );
}
