import styles from "../../../styles/Gallery.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

function GalleryStuff() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/gallery");
        if (JSON.stringify(images) !== JSON.stringify(data)) {
          setImages(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [images]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GALLERY</h1>
      <div className={styles.imagesContainer}>
        {images.map((image) => (
          <div className={styles.imgContainer} key={image._id}>
            <Image
              src={image.img}
              alt="Haircut img not found"
              width="500"
              height="500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryStuff;
