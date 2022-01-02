import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetMerchant } from "../../gql";

const formatPrice = (amount) => "$" + amount.toString() + ".00";

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

  const transactions = merchant.transactions;

  // TODO: get merchant info with graphql

  return (
    <div className="capitalize">
      <hr className="my-5" />

      <p className="mt-4">
        <span className="inline-block min-w-[200px] font-bold">
          merchant id:
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

      <hr className="my-5" />
      <h2 className="font-bold text-xl text-gray-400 my-5">Your Sales</h2>

      <table className="table-auto mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Date
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Amount
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Category
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
                {t.insertedAt.replace("T", " ")}
              </td>
              <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
                {formatPrice(t.amount)}
              </td>
              <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
                {t.category}
              </td>
              <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
                {t.credit === true
                  ? "Credit"
                  : t.debit === true
                  ? "Debit"
                  : "Other"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { MerchantDetails };
