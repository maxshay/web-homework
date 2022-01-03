import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetUser } from "../../gql";

import { UserTransactionTable } from "./UserTransactionTable";
import { UserChart } from "./UserChart";
import { useStore } from "../../store";

function UserDetails() {
  const { userId } = useParams();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetUser, {
    variables: { id: userId },
  });

  const setModal = useStore.getState().setModal;

  // TODO: get user info with graphql

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div>
        <p>Error ¯\_(ツ)_/¯</p>
        {error?.graphQLErrors && (
          <pre>
            <code>
              message: {JSON.stringify(error?.graphQLErrors[0].message)}
            </code>
          </pre>
        )}
      </div>
    );

  if (!data?.user) return <p>No user found</p>;

  const user = data.user;

  return (
    <div className="capitalize">
      <hr className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <p>
            <span className="inline-block min-w-[200px] font-bold">
              cusomer id:
            </span>
            {userId}
          </p>
          <ul>
            <li className="mt-1">
              <span className="inline-block min-w-[200px] font-bold">
                name:
              </span>
              {user.firstName} {user.lastName}
            </li>
            <li className="mt-1">
              <span className="inline-block min-w-[200px] font-bold">dob:</span>
              {user.dob}
            </li>
            <li className="mt-1">
              <span className="inline-block min-w-[200px] font-bold">
                joined:
              </span>
              {user.insertedAt.split("T")[0]}
            </li>
          </ul>
        </div>
        <div>
          <button
            className="mainButton block mr-0 ml-auto"
            onClick={() => setModal(true, userId)}
          >
            Add Transaction
          </button>
        </div>
      </div>

      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          <h2 className="font-bold text-xl text-gray-400 my-5">
            Your Transactions
          </h2>
          <UserTransactionTable data={user.transactions} />
        </div>
        <div>
          <h2 className="font-bold text-xl text-gray-400 mt-5">A Breakdown</h2>
          <UserChart data={user.transactions} />
        </div>
      </div>
    </div>
  );
}

export { UserDetails };
