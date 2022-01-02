import React from "react";
import { arrayOf, string, bool, number, shape } from "prop-types";

const makeDataTestId = (transactionId, fieldName) =>
  `transaction-${transactionId}-${fieldName}`;

function TxTable({ data }) {
  return (
    <div className="rounded mt-5">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Id
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Customer Id
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Customer name
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Desc.
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Category
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Merchant Id
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Debit
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Credit
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Amount
            </th>
            <th className="px-4 py-2 text-blue-600 border border-blue-500">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "id")}
              >
                {r.id}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "userId")}
              >
                {r.userId}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "userId")}
              >
                {r.user.firstName} {r.user.lastName}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "description")}
              >
                {r.description}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "category")}
              >
                {r.category}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "merchant")}
              >
                {r.merchantId}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "debit")}
              >
                {r.debit.toString()}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "credit")}
              >
                {r.credit.toString()}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "amount")}
              >
                $ {r.amount}
              </td>
              <td
                className="border border-blue-500 px-4 py-2 text-blue-600 font-medium"
                data-testid={makeDataTestId(r.id, "date")}
              >
                {r.insertedAt.replace("T", "  ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
