import styles from "/styles/ServiceList.module.css";
import ServiceCard from "./ServiceCard";

const ServiceList = () =>{
    return (
        <div className={styles.container}>
            
            <h1 className={styles.title}>Services</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua.
            </p>

            <div className={styles.wrapper}>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </div>
        </div>
    );

}

export default ServiceList;