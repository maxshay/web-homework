import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// components
import { Navigation } from "./components";
import { EditTransaction } from "./components";

import { useStore } from "./store";

// pages
import { Home } from "./pages";
import { Transactions } from "./pages";
import { User } from "./pages";
import { Merchant } from "./pages";
import { Participants } from "./pages";

function Layout() {
  const lang = useStore((state) => state.lang);

  return (
    <div id="main-content" className={`${lang === 1 ? "gib" : ""}`}>
      <div className="flex flex-row">
        <Navigation />
        <div className="flex-grow">
          <div className="overflow-auto h-screen relative">
            <div className="px-2 lg:px-4 2xl:px-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transaction/:id" element={<EditTransaction />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/user/:userId" element={<User />} />

          <Route path="/merchant/:merchantId" element={<Merchant />} />
          <Route
            element={<div className="mt-5">Error 404: page not found</div>}
            path="*"
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
