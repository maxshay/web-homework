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
          <tr key={r.node.id}>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.node.id, "id")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/transaction/${r.node.id}/${r.node.user.id}`}
              >
                {r.node.user.id}
              </Link>
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.node.id, "userId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.node.user.id}`}
              >
                {r.node.user.id}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "name")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/user/${r.node.user.id}`}
              >
                {r.node.user.firstName} {r.node.user.lastName}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "description")}
            >
              {r.node.description}
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "category")}
            >
              {r.node.category}
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.node.id, "merchantId")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.node.merchant.id}`}
              >
                {r.node.merchant.id}
              </Link>
            </td>
            <td
              className="transactionTableRow max-w-[100px]"
              data-testid={makeDataTestId(r.node.id, "merchantName")}
            >
              <Link
                className="text-blue-500 hover:text-blue-600 underline"
                to={`/merchant/${r.node.merchant.id}`}
              >
                {r.node.merchant.name}
              </Link>
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "debit")}
            >
              {r.node.debit.toString()}
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "credit")}
            >
              {r.node.credit.toString()}
            </td>
            <td
              className="transactionTableRow sm:w-[150px]"
              data-testid={makeDataTestId(r.node.id, "amount")}
            >
              {/* {formatPrice(r.node.amount)} */}
              <SpecialNumbers amount={r.node.amount} />
            </td>
            <td
              className="transactionTableRow"
              data-testid={makeDataTestId(r.node.id, "date")}
            >
              {r.node.insertedAt.replace("T", "  ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// TxTable.propTypes = {
//   data: arrayOf(
//     shape({
//       id: string,
//       user_id: string,
//       description: string,
//       merchant_id: string,
//       debit: bool,
//       credit: bool,
//       amount: number,
//     })
//   ),
// };

export { TxTable };
