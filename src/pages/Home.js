import React from "react";

import "../assets/styles/home.scss";
import HomeBanner from "../components/Home/HomeBanner";
import HomeListingPreview from "../components/Home/HomeListingPreview";
import HomeListingOptions from "../components/Home/HomeListingOptions";
import HomeDevelopers from "../components/Home/HomeDevelopers";
import HomeAgents from "../components/Home/HomeAgents";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  return (
    <section>
      <HomeBanner />
      <HomeListingPreview />
      <HomeListingOptions />
      <HomeListingPreview type="rent" />
      <HomeDevelopers />
      <HomeAgents />
    </section>
  );
};

export default Home;
