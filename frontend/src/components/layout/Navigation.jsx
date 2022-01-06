import React from "react";
import { Link } from "react-router-dom";
import { Toggle } from "..";

function Navigation() {
  return (
    <div className="w-72 flex-shrink-0 h-screen bg-gray-50 hidden sm:block">
      <div className="p-3 h-full border-r border-gray-200">
        <div className="flex flex-col h-full justify-between content-between">
          <div>
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
                <li className="mb-3">
                  <p className="lineAround">main</p>
                </li>
                <li>
                  <Link to="/">
                    <button
                      className="mainButton w-full font-bold"
                      data-testid="home-link"
                    >
                      Home
                    </button>
                  </Link>
                </li>

                <li className="mt-8 mb-3">
                  <p className="lineAround">admin</p>
                </li>

                <li className="mt-3">
                  <Link to="/transactions">
                    <button
                      className="mainButton w-full font-bold"
                      data-testid="transactions-link"
                    >
                      Transactions
                    </button>
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="/participants">
                    <button
                      className="mainButton w-full font-bold"
                      data-testid="participants-link"
                    >
                      Users &amp; Vendors
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <Toggle />
        </div>
      </div>
    </div>
  );
}

export { Navigation };
