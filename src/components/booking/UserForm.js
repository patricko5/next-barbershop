import React, { useState } from "react";
import styles from "/styles/booking/UserForm.module.css";

const UserForm = ({
  name,
  email,
  phone,
  note,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onNoteChange,
}) => {
  return (
    <div className={styles.form}>
      <h2 style={{color:"whitesmoke"}}>Contact Information</h2>
      <div className={styles.form_component}>
        <span>Full Name</span>
        <input
          className={styles.form_field}
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Fisrstname Lastname"
          pattern="^^[a-zA-Z]{1,30}(\s[a-zA-Z]{1,30}){0,3}$"
          required
        />
      </div>

      <div className={styles.form_component}>
        <span>Email</span>
        <input
          className={styles.form_field}
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="name@email.com"
          required
        />
      </div>

      <div className={styles.form_component}>
        <span> Phone Number</span>
        <input
          className={styles.form_field}
          type="tel"
          value={phone}
          onChange={onPhoneChange}
          placeholder="000-000-000"
          required
        />
      </div>

      <div className={styles.form_component}>
        <span>Note</span>
        <textarea
          className={`${styles.form_field} ${styles.text_area}`}
          value={note}
          onChange={onNoteChange}
          
          placeholder="Additional details you want the barber to know..."
        />
      </div>
    </div>
  );
};

export default UserForm;