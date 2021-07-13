import React from "react";
import SkeletonList from "../SkeletonList";

const WishlistComponent = (props) => {
  return (
    <div className="wishlist__container">
      <h4>Wishlist Page</h4>
      <SkeletonList />
    </div>
  );
};

export default WishlistComponent;
