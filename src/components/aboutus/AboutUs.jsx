import React from 'react';

import banner from '../../../public/img/aboutus/banner.png'
import { useEffect, useState } from 'react';
import placeholder from '../../../public/img/placeholder.png';
import style from '../../../styles/Home.module.css';
const AboutUs = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    return (
        <section className="mt-0">

            <img src={imageLoaded ? banner : placeholder} onLoad={handleImageLoad} className="bannerAB" />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <h2 className={style.typingText}>We are Romantiko Barbershop...</h2>
                        <p className="lead">A locally owned business, in the heart if Airdrie</p>
                        <p>We are a team of professional barbers, who are dedicated to providing you with the finest grooming experience at prices that won't break the bank.</p>
                        <p>As a family business, we have always taken great pride in providing exceptional service and care to our clients. We believe that every customer who walks through our doors should feel valued and appreciated, and we strive to create a warm and welcoming atmosphere that makes people want to come back again and again.</p>
                        <p>One of the things that sets us apart from other barbershops in the area is our commitment to affordability. We believe that everyone should be able to get a great haircut without breaking the bank, and we are always looking for ways to keep our prices low without compromising on the quality of our services.</p>
                        <p>But affordability is only one part of what makes us special. We are also known for our experienced and passionate team of barbers, who are dedicated to staying up-to-date on the latest trends and techniques in the industry. Whether you're looking for a classic cut or something a little more modern, we have the skills and expertise to help you achieve the look you want.</p>
                        <p>At our barbershop, we understand that our success is thanks to the support of the local community. That's why we take great care to give back in any way we can. From sponsoring local sports teams to supporting charitable causes, we believe in the importance of investing in the people and organizations that make Airdrie such a special place to live.</p>
                        <p>As we look to the future, we are committed to continuing the legacy that my grandfather started all those years ago. We believe that our barbershop is more than just a business - it's a place where people can come to feel valued and appreciated, and to connect with others in the community. We are proud to be a part of the fabric of Airdrie, and we look forward to serving our clients for many years to come.</p>
                        <p>In closing, we want to thank you for considering our barbershop for your hairdressing needs. Whether you're a longtime customer or a first-time visitor, we promise to provide you with exceptional service and care that will leave you feeling confident and refreshed. So come on in, grab a seat, and let us take care of you - we can't wait to welcome you into the family!</p>
                    </div>
                </div>

                {/* a row of immages */}
                <div className='staffPictures'>

                </div>
            </div>
        </section>
    );
}

export default AboutUs;
