import React from "react";
import styles from "/styles/booking/Banner.module.css";
import banner from "../../../public/img/bookingBanner.png";
const Banner = (props) => {
  const handleNextStep = () => {
    props.handleNextStep();
  };
  return (
    <>
      <img src={banner} className={styles.img} />
      <div className={styles.banner_text}>
        <p>
          Set an appointment for haircut now, with this free and easy online
          booking
        </p>
        <button onClick={handleNextStep} className={styles.btn1}>
          Start
        </button>
      </div>
    </>
  );
};

export default Banner;
