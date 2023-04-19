import React from "react";
import Image from "next/image";
import styles from "../../styles/Product.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const Product = () => {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setSelected(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.container}>
      
        <div className={styles.left}>
          
            
          <div className={styles.imgContainer} onClick={toggleModal}>
          <img src={selected.img} className={styles.img} alt=""/>
          </div>
        </div>
      
      <div className={styles.right}>
        
          <h1 className={styles.title}>{selected.productName}</h1>
          <span className={styles.price}>${selected.price}</span>
          <p className={styles.desc}>{selected.description}</p>
          <Link href="/shop">
          <button className={styles.btn1}>
              Back
            </button>
            </Link>
      </div>
      
      {showModal && (
        <div className={styles.modal}>
          <Image src={selected.img} alt="" width="800" height="800"/>
          <button onClick={toggleModal} className={styles.close}>X</button>
        </div>
      )}
    </div>
  );
};

export default Product;

