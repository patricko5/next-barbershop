import React, { useState } from "react";
import styles from "../../../../styles/AddStaff.module.css";
import axios from "axios";

const AddStaff = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [picture, setPicture] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk9lstek/image/upload",
        data
      );
      const { url } = uploadRes.data;
      console.log(uploadRes.data);

      const newStaff = {
        firstName,
        lastName,
        address,
        phoneNumber: phone,
        username,
        email,
        password,
        img: url,
      };

      await axios.post("http://localhost:3000/api/auth/register", newStaff);
      setStatusMessage("New staff member created successfully!");
    } catch (error) {
      console.log(error);
      setStatusMessage("Error creating staff member. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Add a New Staff</h1>
        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>First Name:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Last Name:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Address:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Phone Number:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Username:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Email:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Password:</h4>
          <input
            className={`${styles.infoInput}`}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.infoItem}>
          <h4 className={styles.infoLabel}>Picture:</h4>
          <input
            type="file"
            className={`${styles.infoInput}`}
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>
        <div
          className={styles.statusMessage}
          style={{
            color:
              statusMessage && statusMessage.startsWith("Error")
                ? "red"
                : "lime",
          }}
        >
          {statusMessage}
        </div>
        <div className={styles.action}>
          <button className={styles.actionButton} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
