import React from "react";
import { useQuery } from "@apollo/client";
import { GetTransactions } from "../gql";

import { TxTable } from "../components";

function Transactions() {
  const { loading, error, data = {} } = useQuery(GetTransactions);

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
      <h2 className="font-bold text-xl my-4">All Transactions</h2>
      <TxTable data={data.transactions} />
    </div>
  );
}

export { Transactions };
