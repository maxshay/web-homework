import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetMerchant } from "../gql";

import { MerchantTransactionTable } from "../components";

function Merchant() {
  const { merchantId } = useParams();

  const {
    loading,
    error,
    data = {},
  } = useQuery(GetMerchant, {
    variables: { id: merchantId },
  });

  if (loading)
    return (
      <div>
        <h2 className="font-bold text-xl mt-4">Merchant</h2>
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

  if (!data?.merchant) return <p>No merchant found</p>;

  return (
    <div className="capitalize">
      <h2 className="font-bold text-xl text-gray-500 my-4">Merchant Details</h2>

      <hr className="my-5" />

      <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
        <p>
          <span className="inline-block min-w-[200px] font-bold">
            merchant id:
          </span>
          {data.merchant.id}
        </p>
        <ul>
          <li className="mt-1">
            <span className="inline-block min-w-[200px] font-bold">name:</span>
            {data.merchant.name}
          </li>
          <li className="mt-1">
            <span className="inline-block min-w-[200px] font-bold">
              description:
            </span>
            {data.merchant.description}
          </li>
          <li className="mt-1">
            <span className="inline-block min-w-[200px] font-bold">
              joined:
            </span>
            {data.merchant.insertedAt.split("T")[0]}
          </li>
          <li className="mt-1">
            <span className="inline-block min-w-[200px] font-bold">tags:</span>
            {/* {JSON.stringify(data.merchant.tags)} */}
            {data.merchant.tags?.map((t) => (
              <span
                key={t}
                className="border rounded bg-blue-500 text-white font-bold px-1 border-blue-600 mr-2"
              >
                {t}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <hr className="my-5" />
      <h2 className="font-bold text-xl text-gray-500 my-5">Your Sales</h2>

      <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
        <MerchantTransactionTable data={data.merchant.transactions} />
      </div>
    </div>
  );
}

export { Merchant };
