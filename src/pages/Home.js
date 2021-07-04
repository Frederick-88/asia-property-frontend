import React from "react";

import "../assets/styles/home.scss";
import HomeBanner from "../components/Home/HomeBanner";
import HomeListingPreview from "../components/Home/HomeListingPreview";
import HomeListingOptions from "../components/Home/HomeListingOptions";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeListingPreview />
      <HomeListingOptions />
      <HomeListingPreview type="rent" />
    </div>
  );
};

export default Home;
