import React from "react";

import "../assets/styles/home.scss";
import HomeBanner from "../components/Home/HomeBanner";
import HomeListingPreview from "../components/Home/HomeListingPreview";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeListingPreview />
    </div>
  );
};

export default Home;
