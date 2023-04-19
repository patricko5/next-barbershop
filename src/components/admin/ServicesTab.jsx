import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/AdminServices.module.css";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";

const ServicesTab = () => {
  const [file, setFile] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleCreate = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads"); //make sure the folder in the cloud is the same
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk9lstek/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newServices = {
        serviceName,
        price: servicePrice,
        description: serviceDescription,
        img: url,
      };

      await axios.post("http://localhost:3000/api/services", newServices);
      setImages([...images, { img: url }]);
      setMsg(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/services/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/services");
      setImages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const updateButton = async () => {
    if (!selectedServiceId) return;
    try {
      const _service = {
        serviceName,
        price: servicePrice,
        description: serviceDescription,
      };
      await axios.put(
        `http://localhost:3000/api/services/${selectedServiceId}`,
        _service
      );
      fetchImages();
      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditService = (service) => {
    setModal(true);
    setServiceName(service.serviceName);
    setServicePrice(service.price);
    setServiceDescription(service.description);
    setSelectedServiceId(service._id);
  };

  return (
    <div className={styles.servicesContainer}>
      <h1 className={styles.servicesTitle}>Manage Services</h1>
      <div className={styles.uploadBox}>
        <div className={styles.uploadContainer}>
        <h4 className={styles.addTitle}>Add a service</h4>
            <label>Choose an image</label>
            <div className={styles.fileInput}>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                // onClick={() => setMsg(false)}
                className="inputFile"
              />
            </div>
          <label>Service name: </label>
                <input
                  // value={serviceName}
                  type="text"
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <label>Price:</label>
                <input
                  // value={servicePrice}
                  type="number"
                  onChange={(e) => setServicePrice(e.target.value)}
                />
                <label>Description: </label>
                <textarea
                  // value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Description here..."
                  rows="5" cols="40"
                />
           <button onClick={handleCreate} className={styles.uploadButton}>
            Upload
          </button>
     {msg && (
                  <h4>The image has been successfully uploaded.</h4>
                )}
        </div>
      </div>
      <h1 className={styles.currentServices}>Current Services</h1>
      <div className={styles.container}>
        <div className={styles.imagesContainer}>
          {images.map((image) => (
            <div className={styles.imgContainer} key={image._id}>
              <Image
                src={image.img}
                alt="Haircut img not found"
                width="205"
                height="205"
                style={{ borderRadius: "10px" }}
              />
              <button className={styles.deleteButton}>
                <DeleteIcon onClick={() => handleRemove(image._id)} />
              </button>
              <button
                className={styles.editButton}
                onClick={() => handleEditService(image)}
              >
                Edit
              </button>
              <div className={styles.servName}>{image.serviceName}</div>
              <div className={styles.servPrice}>{image.price}</div>
              {/* <div>Description: {image.description}</div> */}
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay}>
            <div className={styles.modalContent}>
              <div className={styles.formContainer}>
                <label>Service name: </label>
                <input
                  value={serviceName}
                  type="text"
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <br></br>
                <label>Price:</label>
                <input
                  value={servicePrice}
                  type="number"
                  onChange={(e) => setServicePrice(e.target.value)}
                />
                <br></br>
                <label>Description: </label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Description here..."
                  rows="5" cols="40"
                />
                <br></br>
                <button onClick={updateButton}>Edit</button>
                {/* {msg && (
                  <h3>The image has been successfully uploaded.</h3>
                )} */}
                <button
                  className="closeButton"
                  onClick={() => {
                    setModal(false);
                    setSelectedServiceId(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
