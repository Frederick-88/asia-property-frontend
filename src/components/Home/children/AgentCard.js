import React from "react";
import SampleAgent from "../../../../src/assets/images/sample-agent.jpeg";

const AgentCard = (props) => {
  const locationText = `${props.data.city}, ${props.data.country}`;

  return (
    <div className="agent-card">
      <img className="card__image" src={SampleAgent} alt="agent" />
      <div className="card__content">
        <h4 className="title">{props.data.name}</h4>
        <div className="card-detail detail--location">
          <i className="icon-travel detail-icon" />
          <p className="detail-text">{locationText}</p>
        </div>
        <div className="card-detail">
          <i className="icon-travel detail-icon" />
          <p className="detail-text">{props.data.phone_number}</p>
        </div>
        <div className="card-detail">
          <i className="icon-travel detail-icon" />
          <p className="detail-text">{props.data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;