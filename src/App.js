import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/global.scss";

import mainBackground from "./assets/images/home_bg.jpg";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const backgroundStyle = (image) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(29,41,62,0.6) 0%,rgba(29,41,62,0.6) 100%), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  return (
    <main>
      <BrowserView>
        <Router>
          <main
            className="main-section"
            style={backgroundStyle(mainBackground)}
          >
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </main>
        </Router>
      </BrowserView>
      <MobileView>
        <h2>
          Not Rendered on Mobile, please visit from desktop/bigger screen.
        </h2>
      </MobileView>
    </main>
  );
};

export default App;
