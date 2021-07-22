import React from "react";
import WishlistComponent from "../components/Wishlists/WishlistComponent";
import "../assets/styles/wishlists.scss";
import "aos/dist/aos.css";

const Wishlist = (props) => {
  return (
    <section>
      <WishlistComponent />
    </section>
  );
};

export default Wishlist;
