import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const role = useSelector((state) => state.auth.role);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">Romantiko Barbershop</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {loggedIn ? (
            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                {role === "admin" && (
                  <li className="nav-item">
                    <Link href="/admin">
                      <a className="nav-link mx-2">Admin</a>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link href="/dashboard">
                    <a className="nav-link mx-2">Dashboard</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link mx-2"
                    onClick={handleLogout}
                    style={{ background: "none", border: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <Link href="/" aria-current="page" passHref>
                    <a className="nav-link mx-2">Home</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Services" passHref>
                    <a className="nav-link mx-2">
                      Services
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/gallery" passHref>
                    <a className="nav-link mx-2"> Gallery </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/shop" passHref>
                    <a className="nav-link mx-2"> Shop </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/booking" passHref>
                    <a className="nav-link mx-2">Booking</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/about-us" passHref>
                    <a className="nav-link mx2">About Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
