import React from "react";
import "../assets/styles/skeletonlist.scss";

const SkeletonList = (props) => {
  const quantity = props.quantity ? props.quantity : 5;

  // since in react can't .map based on number so need to create a mock array
  const mockQuantityArray = () => {
    const array = [];

    for (let index = 0; index < quantity; index++) {
      array[index] = "mock-value"; // nothing important about the value, just creating mock-array
    }

    return array;
  };

  return (
    <div className="skeleton-list__container">
      {mockQuantityArray().map((element, index) => {
        return (
          <div className="card-skeleton__container" key={index}>
            <div className="card-skeleton">
              <div className="animated-background">
                <div className="card-skeleton-img"></div>
                <div className="skel-mask-container">
                  <div className="skel-mask skel-mask-1"></div>
                  <div className="skel-mask skel-mask-2"></div>
                  <div className="skel-mask skel-mask-3"></div>
                  <div className="skel-mask skel-mask-4"></div>
                  <div className="skel-mask skel-mask-5"></div>
                  <div className="skel-mask skel-mask-6"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonList;
