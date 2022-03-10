import React from "react";
import Lottie from "react-lottie-player";

import JsonFile from "../assets/json/work-in-progress.json";
import "../assets/styles/unsupporteddevice.scss";

/* eslint-disable */
const UnsupportedDevicePage = (props) => {
  return (
    <div className="unsupported-device-page">
      <div className="lottie-animation__container">
        <Lottie loop animationData={JsonFile} play />
      </div>

      <h2 className="title">
        Work in progress for this device screen resolution. Please kindly visit
        with bigger desktop =)
      </h2>
      <div className="social-media__wrapper">
        <a
          className="media-button icon-github"
          href="https://github.com/Frederick-88"
          target="blank"
        />
        <a
          className="media-button icon-linkedin-solid"
          href="https://www.linkedin.com/in/chen-frederick"
          target="_blank"
        />
        <a
          className="media-button icon-whatsapp"
          href="https://wa.link/fqa4e7"
          target="_blank"
        />
      </div>
    </div>
  );
};

export default UnsupportedDevicePage;
