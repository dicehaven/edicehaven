import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Shop from "./Shop";
import ProductPage from "./ProductPage";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={Shop} />
      <Route path="/product/:id" component={ProductPage} />
    </Router>
  );
};

export default AppRouter;
