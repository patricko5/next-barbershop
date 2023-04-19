import React from "react";
import { useEffect, useState } from "react";
import Banner from "../../src/components/booking/Banner";
import ServiceCard from "../../src/components/booking/ServiceCard";
import BookingCard from "../../src/components/booking/BookingCard";
import TimeSlot from "../../src/components/booking/TimeSlot";
import styles from "/styles/booking/Booking.module.css";
import axios from "axios";
import dayjs from "dayjs";

const Booking = () => {
  const [services, setServices] = useState([]);
  const [bookingTime, setBookingTime] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/services/");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getServices();
  }, []);

  const handleSelectService = () => {
    if (selectedService) {
      //console.log(currentStep);
      setCurrentStep(1);
    } else {
      alert("Please select a service first");
    }
  };

  const handleSelectTimeSlot = () => {
    if (selectedDate && selectedTimeSlot && selectedStaff) {
      setCurrentStep(2);
    } else {
      alert("Please select a Date, Time, and Staff");
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles.main}>
      {currentStep == -1 && (
        <>
          <Banner handleNextStep={handleNextStep} />
        </>
      )}
      {currentStep == 0 && (
        <>
        
        <h3 className={styles.title}>Please Select Service</h3>
        <div className={styles.service_container}>
          
          <div className={styles.service_wrapper}>

            {services.map((service) => (
              <ServiceCard
                service={service}
                key={service._id}
                onSelectService={setSelectedService}
              />
            ))}
          </div>
          <button onClick={handleSelectService} className={styles.btn1}>
            Next
          </button>
          </div>
        </>
      )}

      {currentStep == 1 && (
        <>
          <h3 className={styles.title}>Please Select Time</h3>
          <div className={styles.booking_container}>
            <TimeSlot
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
              setSelectedStaff={setSelectedStaff}
              setSelectedStaffId={setSelectedStaffId}
              setBookingTime={setBookingTime}
            />
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "2%",
            }}
          >
            <button onClick={() => setCurrentStep(0)} className={styles.btn1} style={{width:"100%"}}>
              Back
            </button>
            <button onClick={handleSelectTimeSlot} className={styles.btn1} style={{width:"100%"}}>
              Next
            </button>
          </div>
          
        </>
      )}

      {currentStep == 2 && (
        <>
          <div className={styles.booking_container}>
            <BookingCard
              startTime={bookingTime[0]}
              endTime={bookingTime[1]}
              selectedService={selectedService}
              selectedStaff={selectedStaff}
              selectedStaffId={selectedStaffId}
              handlePrevStep={handlePrevStep}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
