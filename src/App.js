import React, { useState, useEffect } from "react";


import ReactDOM from "react-dom";
import logo from "./logo-icon.svg";

// import { PageSettings } from './config/page-settings.js';

import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Content from "./components/content/content";
import Footer from "./components/footer/footer";
import ListAdmins from "./components/admin/listadmins";
import PatchAdmin from "./components/admin/patchadmin";
import AddAdmin from "./components/admin/addadmin";

function App() {
  return (
    <div className="App">
      <Header logo={logo} />
      <Sidebar />
      <PatchAdmin />
      <Footer />
    </div>
  );
}

export default App;
