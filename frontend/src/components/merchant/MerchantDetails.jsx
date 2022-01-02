import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetMerchant } from "../../gql";

function MerchantDetails() {
  const { merchantId } = useParams();

  const {
    loading,
    error,
    data = {},
  } = useQuery(GetMerchant, {
    variables: { id: merchantId },
  });

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

  if (!data?.merchant) return <p>No user found</p>;

  const merchant = data.merchant;

  // TODO: get merchant info with graphql

  return (
    <div className="capitalize">
      <p className="mt-4">
        <span className="inline-block min-w-[200px] font-bold">
          cusomer id:
        </span>
        {merchantId}
      </p>
      <ul>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">name:</span>
          {merchant.name}
        </li>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">
            description:
          </span>
          {merchant.description}
        </li>
        <li className="mt-1">
          <span className="inline-block min-w-[200px] font-bold">joined:</span>
          {merchant.insertedAt.split("T")[0]}
        </li>
      </ul>
    </div>
  );
}

export { MerchantDetails };
