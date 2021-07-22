import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AgentCard from "./children/AgentCard";
import SkeletonList from "../SkeletonList";
import Slider from "react-slick";

const HomeAgents = (props) => {
  const customSlider = useRef();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const isLoading = props.isLoadingType === "agent" || props.isInitialLoad;

  const carouselWrapperClass = () => {
    return isLoading
      ? "carousel__wrapper wrapper--is-loading"
      : "carousel__wrapper";
  };

  const AgentPreviewComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={3} />;
    } else {
      return (
        <Slider ref={(slider) => (customSlider.current = slider)} {...settings}>
          {props.agentsData.map((listing, index) => {
            return <AgentCard data={listing} key={index} />;
          })}
        </Slider>
      );
    }
  };

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

        <div className={carouselWrapperClass()}>{AgentPreviewComponent()}</div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingType: state.UsersReducer.isLoadingType,
    isInitialLoad: state.UsersReducer.isInitialLoad,
    agentsData: state.UsersReducer.agentsData,
  };
};

export default connect(mapStateToProps, null)(HomeAgents);
