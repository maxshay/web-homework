import React from "react";
import { SpecialNumbers } from "..";

export function MerchantTransactionTable({ data }) {
  return (
    <table className="table-auto w-full mt-5">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-400">Date</th>
          <th className="px-4 py-2 border border-gray-400">Amount</th>
          <th className="px-4 py-2 border border-gray-400">Category</th>
          <th className="px-4 py-2 border border-gray-400">Type</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id}>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {t.insertedAt.replace("T", " ")}
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              <SpecialNumbers amount={t.amount} />
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {t.category}
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
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
  );
}
