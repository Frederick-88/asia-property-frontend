import React, { useRef } from "react";
import { Link } from "react-router-dom";
import AgentCard from "./children/AgentCard";
import Slider from "react-slick";

const HomeAgents = () => {
  const customSlider = useRef();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const agentData = [
    {
      name: "Andy Law",
      country: "Indonesia",
      city: "Jakarta",
      phone_number: "085877881000",
      email: "agent@gmail.com",
    },
    {
      name: "Bakugo",
      country: "Japan",
      city: "Tokyo",
      phone_number: "085877881008",
      email: "agent@gmail.com",
    },
    {
      name: "Susan Goh",
      country: "Indonesia",
      city: "Jakarta",
      phone_number: "085877221000",
      email: "agent@gmail.com",
    },
    {
      name: "Bob Sadino",
      country: "Indonesia",
      city: "Batam",
      phone_number: "085877881000",
      email: "agent@gmail.com",
    },
  ];

  const setPrevCarousel = () => {
    customSlider.current.slickPrev();
  };

  const setNextCarousel = () => {
    customSlider.current.slickNext();
  };

  return (
    <section className="home__agents">
      <div className="agent__header-wrapper">
        <h4 className="agent-title">Our Agents</h4>
        <p className="agent-subtitle">
          Asia Property has 100+ agents that ready to provide the best service &
          support for your dream home purchases.
        </p>
        <Link to="/our-agents" className="agent__button">
          <p className="title">See all agents</p>
          <i className="icon-arrow-right" />
        </Link>
      </div>

      <div className="agent__list-carousel">
        <div className="carousel__button-list">
          <button
            type="button"
            className="carousel-icon"
            onClick={setPrevCarousel}
          >
            <i className="icon-chevron-left" />
          </button>
          <button
            type="button"
            className="carousel-icon"
            onClick={setNextCarousel}
          >
            <i className="icon-chevron-right" />
          </button>
        </div>

        <div className="carousel__wrapper">
          <Slider
            ref={(slider) => (customSlider.current = slider)}
            {...settings}
          >
            {agentData.map((agent, index) => {
              return <AgentCard data={agent} key={index} />;
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HomeAgents;
