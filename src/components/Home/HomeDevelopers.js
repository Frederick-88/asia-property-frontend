import React from "react";
import Slider from "react-slick";
import DeveloperImage01 from "../../../src/assets/images/developer-01.png";
import DeveloperImage02 from "../../../src/assets/images/developer-02.png";
import DeveloperImage03 from "../../../src/assets/images/developer-03.png";
import DeveloperImage04 from "../../../src/assets/images/developer-04.png";
import DeveloperImage05 from "../../../src/assets/images/developer-05.png";
import DeveloperImage06 from "../../../src/assets/images/developer-06.png";

const HomeDevelopers = () => {
  const settings = {
    dots: false,
    infinite: true,
    swipe: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  const developers = [
    {
      image: DeveloperImage01,
    },
    {
      image: DeveloperImage02,
    },
    {
      image: DeveloperImage03,
    },
    {
      image: DeveloperImage04,
    },
    {
      image: DeveloperImage05,
    },
    {
      image: DeveloperImage06,
    },
    {
      image: DeveloperImage05,
    },
    {
      image: DeveloperImage04,
    },
  ];

  return (
    <section className="home__developers">
      <div className="developer__header-wrapper">
        <h4 className="developer-title">Developers</h4>
        <p className="developer-subtitle">
          Asia Property has worked & cooperate together with 40+ developers
          around Asia.
        </p>
      </div>

      <div className="carousel__wrapper">
        <Slider {...settings}>
          {developers.map((dev, index) => {
            return (
              <div className="developer__image-wrapper" key={index}>
                <img
                  className="developer__image"
                  src={dev.image}
                  alt="developer"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default HomeDevelopers;
