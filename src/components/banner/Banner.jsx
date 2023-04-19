import React from 'react';
import Image from "next/image";
import styles from "/styles/Banner.module.css";

const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
            <Image src="/img/bookingBanner.png" alt="" layout="fill" objectFit="contain"/>
            </div> 
        </div>
    );
}

export default Banner;
