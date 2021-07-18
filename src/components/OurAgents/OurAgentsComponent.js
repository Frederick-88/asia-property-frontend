import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import SkeletonList from "../SkeletonList";
import AgentCard from "../Home/children/AgentCard";
import Pagination from "../../utilities/Pagination";

import ourAgentsVector from "../../assets/images/illustrations/agent.png";
import banner from "../../assets/images/banner-bg.jpg";

const OurAgentsComponent = (props) => {
  const history = useHistory();
  const currentQueryUrl = useLocation().search;
  const paginationCount = 4;
  const isLoading = false;

  // -----------------------------------
  // < ------------------------------- >
  // -----------------------------------

  const backgroundStyle = (image) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(29,41,62,0.6) 0%,rgba(29,41,62,0.6) 100%), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const ListingListComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={6} />;
    } else {
      return (
        <div className="our-agents-list__container">
          <h4 className="list-title">88 Agents</h4>
          <div className="our-agents-list">
            {sampleAgentData(10).map((listing, index) => {
              return <AgentCard data={listing} key={index} />;
            })}
          </div>
        </div>
      );
    }
  };

  const sampleAgentData = (quantity) => {
    const array = [];

    for (let index = 0; index < quantity; index++) {
      array.push({
        name: "Susan Goh " + index,
        country: "Indonesia",
        city: "Batam",
        phone_number: "085877881000",
        email: "agent@gmail.com",
      });
    }

    return array;
  };

  useEffect(() => {
    if (!currentQueryUrl) {
      // always need to have '?page={page_num}'
      history.push("?page=1");
    }
  }, [currentQueryUrl, history]);

  return (
    <div className="our-agents__container">
      <div className="our-agents__banner" style={backgroundStyle(banner)}>
        <div className="banner-container">
          <img className="banner-image" src={ourAgentsVector} alt="cover" />
          <div className="banner-text">
            <h4 className="banner-title">Our Agents</h4>
            <p className="banner-description">
              Asia Property has 100+ agents that ready to provide the best
              service & support for your dream home purchases.
            </p>
          </div>
        </div>
      </div>
      <div className="our-agents__content">
        <ListingListComponent />
        <Pagination paginationCount={paginationCount} />
      </div>
    </div>
  );
};

export default OurAgentsComponent;
