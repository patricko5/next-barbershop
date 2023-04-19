import styles from "/styles/ServiceCard.module.css"
import React from 'react';
import Image from "next/image";

const ServiceCard = () => {
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image src="/img/service.png" alt="" width="50" height="50"/>
                <h1 className={styles.title}>Service Name</h1>

                <div className={styles.description}>
                    <span className={styles.time}>30 minutes</span>
                    <span className={styles.price}>$20+gst</span>
                </div>
                <button 
                className={styles.button}>Book Now</button>
            </div>
        </div>
    );

}

export default ServiceCard;

