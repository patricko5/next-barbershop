import styles from "/styles/booking/ServiceCard.module.css";
import React from "react";
import { useState, useEffect } from "react";

const ServiceCard = ({ service, onSelectService }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${styles.container} ${isVisible ? styles.isVisible : ""}`}>
      <div className={styles.service_container}>
        <input
          type="radio"
          name="service"
          id={service._id}
          value={service._id}
          onChange={() => onSelectService(service)}
          className={styles.radioButton}
        />

        <label htmlFor={service._id} className={styles.buttonLabel}>
          <p className={styles.service_title}>{service.serviceName}</p>
          <p className={styles.service_details}>${service.price}</p>
          <p className={styles.service_details}>Duration: 30 mins</p>
        </label>
      </div>
    </div>
  );
};

export default ServiceCard;
