import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InitialPage from "./components/index";

function App() {
  return (
    <div>
      <BrowserView>
        <Router>
          <Switch>
            <Route exact path="/">
              <InitialPage />
            </Route>
          </Switch>
        </Router>
      </BrowserView>
      <MobileView>
        <h2>
          Not Rendered on Mobile, please visit from desktop/bigger screen.
        </h2>
      </MobileView>
    </div>
  );
}

export default App;
