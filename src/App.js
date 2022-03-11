import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _debounce from "lodash.debounce";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global.scss";

import mainBackground from "./assets/images/home_bg.jpg";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./utilities/ScrollToTop";

import UnsupportedDevice from "./components/UnsupportedDevice";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Wishlist from "./pages/Wishlist";
import OurAgents from "./pages/OurAgents";
import AdminRouteHandler from "./pages/admin/AdminRouteHandler";

const App = () => {
  const [isShowWorkInProgress, setIsShowWorkInProgress] = useState(false);
  const backgroundStyle = (image) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(29,41,62,0.6) 0%,rgba(29,41,62,0.6) 100%), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const detectScreenSize = () => {
    // smallest width on popular used desktop resolution is 1280
    if (window.innerWidth < 1200) {
      setIsShowWorkInProgress(true);
    } else {
      setIsShowWorkInProgress(false);
    }
  };

  useEffect(() => {
    const handleResize = _debounce(() => detectScreenSize(), 100); // avoid repetitive process, it will hold all the repetitive calls, then if after 0.1s no call, then it will do the process
    detectScreenSize();

    // proper way to handle event listener -> https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main>
      {!isShowWorkInProgress && (
        <div>
          <Router>
            <main
              className="main-section"
              style={backgroundStyle(mainBackground)}
            >
              <ScrollToTop />
              <Navbar />
              <ToastContainer />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/listings">
                  <Listings />
                </Route>
                <Route exact path="/listing/:id">
                  <ListingDetail />
                </Route>
                <Route exact path="/wishlists">
                  <Wishlist />
                </Route>
                <Route exact path="/our-agents">
                  <OurAgents />
                </Route>

                <Route path="/admin">
                  <AdminRouteHandler />
                </Route>
              </Switch>
              <Footer />
            </main>
          </Router>
        </div>
      )}

      {isShowWorkInProgress && <UnsupportedDevice />}
    </main>
  );
};

export default App;
