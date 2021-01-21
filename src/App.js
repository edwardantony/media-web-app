import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminListing } from "./components/Admin/AdminListing";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AdminListing />
        </Route>
      </Switch>
    </Router>
  );
};
