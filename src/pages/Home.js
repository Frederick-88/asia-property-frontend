import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  getListingWithQueries,
  getAgents,
} from "../actionCreators/UsersAction";

import "../assets/styles/home.scss";
import HomeBanner from "../components/Home/HomeBanner";
import HomeListingPreview from "../components/Home/HomeListingPreview";
import HomeListingOptions from "../components/Home/HomeListingOptions";
import HomeDevelopers from "../components/Home/HomeDevelopers";
import HomeAgents from "../components/Home/HomeAgents";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getListingWithQueries({
        type: "for-sale",
      })
    );
    dispatch(
      getListingWithQueries({
        type: "for-rent",
      })
    );
    dispatch(getAgents());
  }, [dispatch]);

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

const mapDispatchToProps = {
  getListingWithQueries,
  getAgents,
};

export default connect(null, mapDispatchToProps)(Home);
