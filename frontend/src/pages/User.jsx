import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetUser } from "../gql";
import { UserTransactionTable, UserChart } from "../components";
import { AddTransactionModal } from "../components";

function User() {
  const [showModal, setShowModal] = useState(false);
  const { userId } = useParams();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetUser, {
    variables: { id: userId },
  });

  if (loading)
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">User</h2>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p className="mt-4">Error ¯\_(ツ)_/¯</p>
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
      <h2 className="font-bold text-xl text-gray-500 mt-4">User Details</h2>

      <hr className="my-5" />

      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
          <p>
            <span className="inline-block sm:min-w-[200px] font-bold">
              cusomer id:
            </span>
            {userId}
          </p>
          <ul>
            <li className="mt-1">
              <span className="inline-block sm:min-w-[200px] font-bold">
                name:
              </span>
              {user.firstName} {user.lastName}
            </li>
            <li className="mt-1">
              <span className="inline-block sm:min-w-[200px] font-bold">
                dob:
              </span>
              {user.dob}
            </li>
            <li className="mt-1">
              <span className="inline-block sm:min-w-[200px] font-bold">
                joined:
              </span>
              {user.insertedAt.split("T")[0]}
            </li>
          </ul>
        </div>
        <div>
          <button
            className="mainButton block mr-0 xl:ml-auto mt-4 xl:mt-0"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
        </div>
      </div>

      <hr className="my-5" />
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4 mb-4">
        <div>
          <h2 className="font-bold text-xl text-gray-500 my-5">
            Your Transactions
          </h2>
          <div className="bg-gray-50 p-8 rounded-md shadow-sm border overflow-x-auto">
            <UserTransactionTable data={user.transactions} userId={userId} />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-xl text-gray-500 my-5">A Breakdown</h2>
          <div className="bg-gray-50 p-8 rounded-md shadow-sm border">
            <UserChart data={user.transactions} />
          </div>
        </div>
      </div>
      {showModal && (
        <AddTransactionModal userId={userId} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export { User };
