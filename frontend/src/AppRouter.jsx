import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Navigation } from "./components";
import { Home } from "./pages";
import { Transactions } from "./pages";

function Layout() {
  return (
    <div id="main-content">
      <div className="flex flex-row">
        <Navigation />
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<Transactions />} path="/transactions" />
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