import React from "react";
import Link from "next/link";
import CardSlide from "./CardSlide";

const Homepage = () => {
  return (
    <>
      <video loop muted autoPlay className="vidBG">
        <source src="/videos/bgloop.mp4" type="video/mp4" />
      </video>

      <div className="hero">
        <h1 >
          Romantiko Barbershop
        </h1>

        <p>
          Local charm meets professional quality. Our expert barbers are
          dedicated to providing you with the finest grooming experience at
          prices that won't break the bank. Whether you need a classic cut or a
          modern style, our team will ensure you leave looking and feeling your
          best. Join our community of locals and experience the best in
          affordable grooming.
        </p>
        <Link href={"/booking"}>
          <button>Book a haircut now</button>
        </Link>

        <CardSlide></CardSlide>
      </div>
    </>
  );
};

export default Homepage;
