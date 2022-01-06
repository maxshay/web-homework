import React from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useStore } from "../store";
import { useQuery, useMutation } from "@apollo/client";
import { GetUser, DeleteTransaction } from "../gql";
import { UserTransactionTable, UserChart } from "../components";

function User() {
  const { userId } = useParams();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetUser, {
    variables: { id: userId },
  });
  const [onDeleteHandler] = useMutation(DeleteTransaction);

  const setModal = useStore.getState().setModal;

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

  console.log(user);

  return (
    <div className="capitalize">
      <h2 className="font-bold text-xl text-gray-500 mt-4">User Details</h2>

      <hr className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
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
            className="mainButton block mr-0 sm:ml-auto"
            onClick={() => setModal(true, userId)}
          >
            Add Transaction
          </button>
        </div>
      </div>

      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="font-bold text-xl text-gray-500 my-5">
            Your Transactions
          </h2>
          <div className="overflow-x-auto">
            <UserTransactionTable
              data={user.transactions}
              onDeleteHandler={onDeleteHandler}
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-xl text-gray-500 my-5">A Breakdown</h2>
          <UserChart data={user.transactions} />
        </div>
      </div>
    </div>
  );
}

export { User };
