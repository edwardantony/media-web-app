import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminListing } from "./components/Admin/AdminListing";
import { SubscribersListing } from "./components/Admin/SubscribersListing";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/subscribers">
          <SubscribersListing />
        </Route>
        <Route path="/">
          <AdminListing />
        </Route>
      </Switch>
    </Router>
  );
};
