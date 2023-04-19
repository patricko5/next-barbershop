import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../../../styles/GalleryTab.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

const GalleryTab = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // add loading state

  const handleCreate = async () => {
    setLoading(true); // set loading state to true when upload button is clicked
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads"); //make sure the folder in the cloud is the same
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk9lstek/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newGallery = {
        img: url,
      };
      await axios.post("http://localhost:3000/api/gallery", newGallery);
      setMsg(true);
      setLoading(false); // set loading state to false when upload process is complete
      //setFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/gallery/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/gallery");
        setImages(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [images]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Manage Gallery</h1>
      <div className={styles.formContainer}>
        <div className={styles.item}>
          <label>Choose an image:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            onClick={() => setMsg(false)}
          />
        </div>
        <button onClick={handleCreate} className={styles.uploadButton}>
          Upload
        </button>
        {loading && (
          <>
            <p>Uploading image...</p>
            <i className="fa fa-spinner fa-spin"></i>
          </>
        )}
      </div>
      <h1 className={styles.pageTitle}>Current Pictures</h1>
      <div className={styles.container}>
        {images.length > 0 ? (
          <div className={styles.imagesContainer}>
            {images.map((image) => (
              <div className={styles.imgContainer} key={image._id}>
                <Image
                  src={image.img}
                  alt="Haircut img not found"
                  width="205"
                  height="220"
                />
                <button className={styles.deleteButton}>
                  <DeleteIcon onClick={() => handleRemove(image._id)} />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GalleryTab;
