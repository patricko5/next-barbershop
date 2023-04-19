import React from "react";
import { useRouter } from "next/router";
import styles from "/styles/booking/ConfirmBooking.module.css";
import { formattedDate } from "../../config/convertToHours.config";

const ConfirmBooking = () => {
  const router = useRouter();

  const startTime = router.query.startTime;
  const endTime = router.query.endTime;
  const serviceName = router.query.serviceName;
  const barberName = router.query.selectedStaff;

  const name = router.query.name;
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.booking_header}>
          <h1 className={styles.booking_title}>Your booking is confirmed!</h1>
          <h5 className={styles.booking_message1}>
            Thank you for booking with us. Your appointment details are below:
          </h5>
        </div>

        <div className={styles.booking_details}>
          <div className={styles.booking_content}>Name: {name}</div>
          <div className={styles.booking_content}>
            Service Type: {serviceName}
          </div>
          <div className={styles.booking_content}>
            Barber Name: {barberName}
          </div>
          <div className={styles.booking_content}>
            Start Time: {formattedDate(startTime)}
          </div>
          <div className={styles.booking_content}>
            End Time: {formattedDate(endTime)}
          </div>

          <p className={styles.booking_message2}>
            We look forward to seeing you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
