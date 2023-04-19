import React, { useState,useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/LoginPage.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login, adminLogin, setID } from "../../redux/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMess, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  //for loggedIn state
  const dispatch = useDispatch();
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);

  function handleLogin(id) {
    dispatch(login());
    handleID(id);
  }
  function handleAdminLogin(id) {
    dispatch(adminLogin());
    handleID(id);
  }

  function handleID(id) {
    dispatch(setID(id));
    //console.log("dispatched id =" + id);
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { username, password }
      );

      if (response.data.role === "admin") {
        handleAdminLogin(response.data.id);
        router.push("/admin"); // Replace with the actual URL of the admin page
      } else if (response.data.role === "staff") {
        console.log(response.data.id);
        handleLogin(response.data.id);
        router.push("/dashboard"); // Replace with the actual URL of the staff page
      }

      /** set name */
      //handleName(response.data.id);
      //console.log(response.data);
    } catch (error) {
      setError(true);
      setErrorMessage("Incorrect username or password.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
      <div className={`${styles.wrapper} ${loaded ? styles.loaded : ''}`}>
        <h2
        >
          Staff Login
        </h2>

        <div className="form-floating mb-3 mt-3">
          <input
            className="form-control"
            type="text"
            id="email"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ backgroundColor: "#EBECF0" }}
          />
          <label htmlFor="email" className={styles.stuff}>
            Username
          </label>
        </div>

        <div className="form-floating mt-3 mb-3">
          <input
            className="form-control"
            type="password"
            id="pwd"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ backgroundColor: "#EBECF0" }}
          />
          <label htmlFor="pwd" className={styles.stuff}>
            Password
          </label>
        </div>

        {error && (
          <div
            className="error-message"
            style={{ "text-align": "center", color: "red" }}
          >
            {errorMess}
          </div>
        )}

        <div>
          <button className={styles.button} onClick={handleSubmit}>
            Login
          </button>
          <br />

          
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
