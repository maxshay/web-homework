import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetTransactions } from "../gql";

import { TxTable } from "../components";

function Transactions() {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [startCursor, setStartCursor] = useState();
  const [endCursor, setEndCursor] = useState();
  const [getTransactions, { loading, error, data = {} }] =
    useLazyQuery(GetTransactions);

  const searchTransactions = (e) => {
    e.preventDefault();
    const formEl = e.target;
    const fd = new FormData(formEl);
    const formObject = Object.fromEntries(fd);
    if (!formObject.useAmount) {
      delete formObject.min;
      delete formObject.max;
    }

    getTransactions({ variables: { first: 10 } });

    // console.log(formObject);

    // make request to data
  };

  const handlePageTurn = (direction) => {
    // go back
    if (direction === 0) {
      if (hasPrev)
        getTransactions({ variables: { last: 10, before: startCursor } });
    } else {
      // next page
      if (hasNext)
        getTransactions({ variables: { first: 10, after: endCursor } });
    }
  };

  useEffect(() => {
    console.log(data);
    if (Object.keys(data).length > 0) {
      setHasNext(data.listTransactions.pageInfo.hasNextPage);
      setHasPrev(data.listTransactions.pageInfo.hasPreviousPage);
      setStartCursor(data.listTransactions.pageInfo.startCursor);
      setEndCursor(data.listTransactions.pageInfo.endCursor);
    }
  }, [data]);

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-500 my-4">Transactions</h2>

      <hr className="my-4" />
      <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
        <p className="font-bold">Search for Transactions</p>
        <form onSubmit={searchTransactions} className="mt-2">
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
          </label>
          <input
            type="number"
            name="max"
            id="search-transactions-max"
            className="px-2 py-1 outline-none border-gray-300 border rounded-md"
            defaultValue="1000"
          />{" "}
          <span>(in dollars)</span>
          <div className="mt-4"></div>
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
          <br />
          <button className="mainButton !px-12 mt-4" type="submit">
            Search
          </button>
        </form>
        <div>
          <button
            className={`mainButton !px-12 mt-4${
              hasPrev === false ? " cursor-not-allowed !opacity-50" : ""
            }`}
            onClick={() => handlePageTurn(0)}
          >
            Prev
          </button>
          <button
            className={`mainButton !px-12 mt-4 ml-4${
              hasNext === false ? " cursor-not-allowed !opacity-50 " : ""
            }`}
            onClick={() => handlePageTurn(1)}
          >
            Next
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="relative">
        <div className="absolute left-0 right-0 bg-red-300 h-full">
          <h2 className="font-bold text-xl text-gray-500 mb-4">Results:</h2>

          {loading && (
            <div>
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div>
              <p>Error ¯\_(ツ)_/¯</p>
            </div>
          )}

          {data && Object.keys(data).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border overflow-x-scroll">
              <TxTable data={data.listTransactions.edges} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Transactions };
