import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getAgents } from "../../actionCreators/UsersAction";

import SkeletonList from "../SkeletonList";
import AgentCard from "../Home/children/AgentCard";

import ourAgentsVector from "../../assets/images/illustrations/agent.png";
import banner from "../../assets/images/banner-bg.jpg";

const OurAgentsComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentQueryUrl = useLocation().search;
  const isLoading = props.isLoadingType === "agent";

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
          <h4 className="list-title">{props.agentsData.length} Agents</h4>
          <div className="our-agents-list">
            {props.agentsData.map((agent, index) => {
              return <AgentCard data={agent} key={index} />;
            })}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (!currentQueryUrl) {
      // always need to have '?page={page_num}'
      history.push("?page=1");
    }
  }, [currentQueryUrl, history]);

  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

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

        {/* Coming Soon Feature */}
        {/* <Pagination paginationCount={paginationCount} /> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getAgents,
};

const mapStateToProps = (state) => {
  return {
    isLoadingType: state.UsersReducer.isLoadingType,
    agentsData: state.UsersReducer.agentsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OurAgentsComponent);
