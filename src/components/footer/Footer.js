import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <footer
      className="text-white text-center text-lg-start"
      style={{ backgroundColor: "#23242a" }}
    >
      <div className="container p-4">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About company</h5>

            <p>
              We are a cozy and affordable barbershop in Airdrie, dedicated to
              providing exceptional service and care for our loyal customers.
            </p>

            <div className="mt-4">
              <a
                href="https://www.facebook.com/romantikobarbershop"
                target="_blank"
                type="button"
                className="btn btn-lg"
                style={{ backgroundColor: "#808080", marginRight: "10px" }}
              >
                <span className="fa fa-facebook-f"></span>
              </a>
              <a
                href="https://www.instagram.com/romantikobarbershop/"
                target="_blank"
                type="button"
                className="btn btn-lg"
                style={{ backgroundColor: "#808080", marginRight: "10px" }}
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://goo.gl/maps/AyNBArYCRZJ4yJGG9"
                target="_blank"
                type="button"
                className="btn btn-lg"
                style={{ backgroundColor: "#808080", marginRight: "10px" }}
              >
                <i className="fa fa-google"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1">Contact Us</h5>

            <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fa fa-home"></i>
                </span>{" "}
                <a
                  style={{ color: "whitesmoke",textDecoration:"none" }}
                  target="_blank"
                  href="https://www.google.com/maps/place/Romantiko+Barber+Shop/@51.2911508,-114.0028717,338m/data=!3m1!1e3!4m6!3m5!1s0x53715f25208d2603:0xe5655ce1b5340234!8m2!3d51.2910039!4d-114.0030376!16s%2Fg%2F11qgyl2v4v"
                >
                  {" "}
                  <span className="ms-1">
                    513 Centre Ave E #125, Airdrie
                  </span>{" "}
                </a>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fa fa-envelope"></i>
                </span>
                <span className="ms-1">contact@romantiko.ca</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fa fa-phone"></i>
                </span>
                <span className="ms-1">(403) 980 - 2686</span>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Opening hours</h5>

            <table className="table text-center text-white">
              <tbody className="font-weight-normal">
                <tr>
                  <td>Mon - Fri:</td>
                  <td>9:30am - 6:00pm</td>
                </tr>
                <tr>
                  <td>Saturday:</td>
                  <td>9:00am - 6:00pm</td>
                </tr>
                <tr>
                  <td>Sunday:</td>
                  <td>10:00am - 5:00pm</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Link href="/Login" passHref>
                      <a
                        
                        style={{ width: "100%", color:"whitesmoke",
                        textDecoration:"none"  }}
                        type="button"
                        
                      >
                        Staff Login
                      </a>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#191919" }}>
        © 2023 Copyright:
        <Link href="/" passHref>
          <a className="text-white m-2">Romantiko.ca</a>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
