import React from "react";
import { arrayOf, string, bool, number, shape } from "prop-types";
import { Link } from "react-router-dom";

import { SpecialNumbers } from "..";

const makeDataTestId = (transactionId, fieldName) =>
  `transaction-${transactionId}-${fieldName}`;

function TxTable({ data }) {
  return (
    <table className="w-full mb-2">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-400 max-w-[100px]">Id</th>
          <th className="px-4 py-2 border border-gray-400 max-w-[100px]">
            Customer Id
          </th>
          <th className="px-4 py-2 border border-gray-400">Customer name</th>
          <th className="px-4 py-2 border border-gray-400">Desc.</th>
          <th className="px-4 py-2 border border-gray-400">Category</th>
          <th className="px-4 py-2 border border-gray-400 max-w-[100px]">
            Merchant Id
          </th>
          <th className="px-4 py-2 border border-gray-400">Merchant Name</th>
          <th className="px-4 py-2 border border-gray-400">Debit</th>
          <th className="px-4 py-2 border border-gray-400">Credit</th>
          <th className="px-4 py-2 border border-gray-400">Amount</th>
          <th className="px-4 py-2 border border-gray-400">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap max-w-[100px] text-ellipsis overflow-hidden"
              data-testid={makeDataTestId(r.id, "id")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/transaction/${r.id}`}
              >
                {r.id}
              </Link>
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap max-w-[100px] text-ellipsis overflow-hidden"
              data-testid={makeDataTestId(r.id, "userId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.userId}`}
              >
                {r.userId}
              </Link>
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "userId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.userId}`}
              >
                {r.user.firstName} {r.user.lastName}
              </Link>
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "description")}
            >
              {r.description}
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "category")}
            >
              {r.category}
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap max-w-[100px] text-ellipsis overflow-hidden"
              data-testid={makeDataTestId(r.id, "merchantId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.merchantId}`}
              >
                {r.merchantId}
              </Link>
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap max-w-[100px] text-ellipsis overflow-hidden"
              data-testid={makeDataTestId(r.id, "merchantName")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.merchantId}`}
              >
                {r.merchant.name}
              </Link>
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "debit")}
            >
              {r.debit.toString()}
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "credit")}
            >
              {r.credit.toString()}
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "amount")}
            >
              {/* {formatPrice(r.amount)} */}
              <SpecialNumbers amount={r.amount} />
            </td>
            <td
              className="border border-gray-400 px-4 py-2 font-medium whitespace-nowrap"
              data-testid={makeDataTestId(r.id, "date")}
            >
              {r.insertedAt.replace("T", "  ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TxTable.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number,
    })
  ),
};

export { TxTable };
