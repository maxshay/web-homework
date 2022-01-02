import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetUser } from "../../gql";

function UserDetails() {
  const { userId } = useParams();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetUser, {
    variables: { id: userId },
  });

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
      <p className="mt-4">
        <span className="inline-block min-w-[200px] font-bold">
          cusomer id:
        </span>
        {userId}
      </p>
      <ul>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">name:</span>
          {user.firstName} {user.lastName}
        </li>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">dob:</span>
          {user.dob}
        </li>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">joined:</span>
          {user.insertedAt.split("T")[0]}
        </li>
      </ul>
    </div>
  );
}

export { UserDetails };
