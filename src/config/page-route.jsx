import React from "react";
import Home from "./../pages/Home.js";
import Login from "./../pages/user/SignIn";
import SignUp from "./../pages/user/SignUp";

const routes = [
  {
    path: "/",
    exact: true,
    title: "Home",
    component: () => <Home />,
  },
  {
    path: "/login",
    exact: true,
    title: "Login",
    component: () => <Login />,
  },
  {
    path: "/signup",
    exact: true,
    title: "Signup",
    component: () => <SignUp />,
  },
];

export default routes;
