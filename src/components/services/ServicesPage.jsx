import styles from "../../../styles/services_style.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ServicesPage = () => {
  const [services, setServices] = useState([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/services");
        setServices(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [services]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        {/* <img className={styles.img}
          src="/img/serviceBanner.png"
          
        /> */}
      </div>
      <h1 className={styles.title}>Our Services</h1>
      {/* <h1 className={styles.title}>SERVICES</h1> */}
      <div className={styles.imagesContainer}>
        {services.map((service) => (
          <div className={styles.imgContainer} key={service._id}>
            <Link href={`/service/${service._id}`} passHref>
            <a>
            <Image
              src={service.img}
              alt="Service img not found"
              width="400"
              height="400"
            />
            </a>
            </Link>
            <div className={styles.serviceText}>
              <div className={styles.haircutTitle}>
               <h2>{service.serviceName}</h2>
              </div>
              {/* <div className={styles.haircutDescription}>
              {service.description}
              </div> */}
              <div className={styles.haircutPrice}>
               <h5>&#36;{service.price}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;

// import { height } from "@mui/system";
// import React from "react";
// import { useState,useEffect } from "react";
// import axios from "axios";
// import styles from '../../../styles/services_style.module.css'
// import haircutImage from './h1.jpg';

// const [images, setImages] = useState([]);

// function ServicesPage(){
// return(
// <div>
//     <div className={styles.container}>
//         <div className={styles.service_card}>
//           <div className={styles.wrapper}>
//             <img src={haircutImage} alt="Haircut" width="400" height="400" style={{margin:20}}/>
//             <h1 className="haircut_title">This is the service title</h1>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla egestas euismod. Nulla sollicitudin felis sagittis, convallis libero eu, egestas dolor. Quisque mi ex, aliquet quis laoreet ut, elementum ac nulla. Quisque varius orci eu ultricies maximus. Praesent turpis purus, egestas et mattis vel, semper a sem. </p>
//                         <p><b>$99</b></p>
//                 <button className={styles.button}>Book now!</button>
//             </div>
//         </div>

//     </div>

// </div>
// );
// }

// export default ServicesPage
