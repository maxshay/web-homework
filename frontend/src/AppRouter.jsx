import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// components
import { Navigation } from "./components";
import { UserDetails } from "./components";
import { MerchantDetails } from "./components";
import { AddModal } from "./components";
import { EditTransaction } from "./components";

import { useStore } from "./store";

// pages
import { Home } from "./pages";
import { Transactions } from "./pages";
import { User } from "./pages";
import { Merchant } from "./pages";
import { Participients } from "./pages";

function Layout() {
  const lang = useStore((state) => state.lang);

  return (
    <div id="main-content" className={`${lang === 1 ? "gib" : ""}`}>
      <div className="flex flex-row">
        <Navigation />
        <div className="flex-grow">
          <div className="h-screen overflow-y-scroll relative">
            <div className="px-10">
              <Outlet />
            </div>
            <AddModal />
          </div>
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
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transaction/:id" element={<EditTransaction />} />
          <Route path="/participients" element={<Participients />} />
          <Route path="/user" element={<User />}>
            <Route path=":userId" element={<UserDetails />} />
          </Route>

          <Route path="/merchant" element={<Merchant />}>
            <Route path=":merchantId" element={<MerchantDetails />} />
          </Route>
          <Route
            element={<div className="mt-5">Error 404: page not found</div>}
            path="*"
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
