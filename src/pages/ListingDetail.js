import React from "react";
import { useParams } from "react-router-dom";

import "../assets/styles/listings.scss";
import ListingDetailComponent from "../components/Listings/ListingDetailComponent";

const ListingDetail = () => {
  const paramId = useParams().id;

  return (
    <section>
      <ListingDetailComponent paramId={paramId} />
    </section>
  );
};

export default ListingDetail;
