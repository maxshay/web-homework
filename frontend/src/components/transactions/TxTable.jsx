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
          <th className="px-4 py-2 border border-gray-300 max-w-[100px] text-ellipsis overflow-hidden">
            Id
          </th>
          <th className="px-4 py-2 border border-gray-300 max-w-[100px] text-ellipsis overflow-hidden">
            Customer Id
          </th>
          <th className="px-4 py-2 border border-gray-300">Customer name</th>
          <th className="px-4 py-2 border border-gray-300">Desc.</th>
          <th className="px-4 py-2 border border-gray-300">Category</th>
          <th className="px-4 py-2 border border-gray-300 max-w-[100px] text-ellipsis overflow-hidden">
            Merchant Id
          </th>
          <th className="px-4 py-2 border border-gray-300">Merchant Name</th>
          <th className="px-4 py-2 border border-gray-300">Debit</th>
          <th className="px-4 py-2 border border-gray-300">Credit</th>
          <th className="px-4 py-2 border border-gray-300 sm:w-[150px]">
            Amount
          </th>
          <th className="px-4 py-2 border border-gray-300">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.id, "id")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/transaction/${r.id}/${r.user.id}`}
              >
                {r.user.id}
              </Link>
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.id, "userId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.user.id}`}
              >
                {r.user.id}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.id, "name")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.user.id}`}
              >
                {r.user.firstName} {r.user.lastName}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.id, "description")}
            >
              {r.description}
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.id, "category")}
            >
              {r.category}
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.id, "merchantId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.merchant.id}`}
              >
                {r.merchant.id}
              </Link>
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.id, "merchantName")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.merchant.id}`}
              >
                {r.merchant.name}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.id, "debit")}
            >
              {r.debit.toString()}
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.id, "credit")}
            >
              {r.credit.toString()}
            </td>
            <td
              className="transactionTableRow sm:w-[150px]"
              data-testid={makeDataTestId(r.id, "amount")}
            >
              {/* {formatPrice(r.amount)} */}
              <SpecialNumbers amount={r.amount} />
            </td>
            <td
              className="transactionTableRow"
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
