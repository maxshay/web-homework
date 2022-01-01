import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages";

function Layout() {
  return (
    <div id="main-content" className="p-2">
      <div>
        <nav className="">
          <ul className="flex ">
            <li>
              <button className="mainButton">
                <Link to="/">Home</Link>
              </button>
            </li>
            <li className="ml-2">
              <button className="mainButton">
                <Link to="/another">Another route</Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            element={<div>Content for /another route</div>}
            path="/another"
          />
          <Route element={<div>Error 404: page not found</div>} path="*" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
