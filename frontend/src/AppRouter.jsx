import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages";
import { Transactions } from "./pages";

function Layout() {
  return (
    <div id="main-content">
      <div className="flex flex-row">
        <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 p-3">
          <div className="logo my-4">
            <div className="w-3/4 mx-auto">
              <img
                src="https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19.png"
                alt="divvy logo"
              />
            </div>
          </div>

          <nav className="my-4">
            <ul className="">
              <li>
                <Link to="/">
                  <button className="mainButton w-full font-bold">Home</button>
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/transactions">
                  <button className="mainButton w-full font-bold">
                    Transactions
                  </button>
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/another">
                  <button className="mainButton w-full font-bold">
                    Another route
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
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
