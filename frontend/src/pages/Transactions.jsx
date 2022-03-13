import React from "react";
import { useQuery } from "@apollo/client";
import { GetTransactions } from "../gql";

import { TxTable } from "../components";

function Transactions() {
  const { loading, error, data = {} } = useQuery(GetTransactions);

  const searchTransactions = (e) => {
    e.preventDefault();
    const formEl = e.target;
    const fd = new FormData(formEl);
    const formObject = Object.fromEntries(fd);
    if (!formObject.useAmount) {
      delete formObject.min;
      delete formObject.max;
    }

    // console.log(formObject);

    // make request to data
  };

  if (loading) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Transactions</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Transactions</h2>
        <p>Error ¯\_(ツ)_/¯</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 my-4">All Transactions</h2>

      <hr className="my-4" />
      <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
        <p className="font-bold">Search for Transactions</p>
        <form onSubmit={searchTransactions} className="mt-2">
          <label
            htmlFor="search-transactions-limit"
            className="font-bold text-gray-500"
          >
            limit:
          </label>{" "}
          <input
            type="number"
            name="limit"
            id="search-transactions-limit"
            className="px-2 py-1 outline-none border-gray-300 border rounded-md"
            defaultValue="10"
          />
          <div className="mt-2"></div>
          <label
            htmlFor="search-transactions-page"
            className="font-bold text-gray-500"
          >
            page:
          </label>{" "}
          <input
            type="number"
            name="page"
            id="search-transactions-page"
            className="px-2 py-1 outline-none border-gray-300 border rounded-md"
            defaultValue="1"
          />
          <div className="my-2">
            <input
              type="checkbox"
              name="useAmount"
              value="ok"
              id="search-transactions-use-amount"
              className="align-middle"
            />{" "}
            <label
              htmlFor="search-transactions-use-amount"
              className="font-bold text-gray-500"
            >
              use min, max?
            </label>
          </div>
          <label
            htmlFor="search-transactions-min"
            className="font-bold text-gray-500"
          >
            min amount:
          </label>{" "}
          <input
            type="number"
            name="min"
            id="search-transactions-min"
            className="px-2 py-1 outline-none border-gray-300 border rounded-md"
            defaultValue="0"
          />{" "}
          <label
            htmlFor="search-transactions-max"
            className="font-bold text-gray-500"
          >
            max amount:
          </label>{" "}
          <input
            type="number"
            name="max"
            id="search-transactions-max"
            className="px-2 py-1 outline-none border-gray-300 border rounded-md"
            defaultValue="1000"
          />{" "}
          <span>(in dollars)</span>
          <br />
          <button className="mainButton !px-12 mt-4" type="submit">
            Search
          </button>
        </form>
        <hr className="my-4" />
        <button className="mainButton !px-10" type="submit">
          Search All
        </button>
      </div>
      <hr className="my-4" />
      <div className="relative">
        <div className="absolute left-0 right-0 bg-red-300 h-full">
          <h2 className="font-bold text-xl text-gray-500 mb-4">Results:</h2>

          <div className="bg-gray-50 p-4 rounded-md shadow-sm border overflow-x-scroll">
            <TxTable data={data.transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Transactions };
