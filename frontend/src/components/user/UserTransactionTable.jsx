import React from "react";

import { SpecialNumbers } from "..";

import { useStore } from "../../store";

export function UserTransactionTable({ data }) {
  const setModal = useStore.getState().setModal;
  return (
    <table className="table-auto mt-5">
      <thead>
        <tr>
          <th className="px-4 py-2 text-blue-600 border border-blue-500">
            Date
          </th>
          <th className="px-4 py-2 text-blue-600 border border-blue-500">
            Desc.
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
          <th className="px-4 py-2 text-blue-600 border border-blue-500"></th>
          <th className="px-4 py-2 text-blue-600 border border-blue-500"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              {r.insertedAt.replace("T", " ")}
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              {r.description}
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              <SpecialNumbers amount={r.amount} />
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              {r.category}
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              {r.credit === true
                ? "Credit"
                : r.debit === true
                ? "Debit"
                : "Other"}
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              <button
                className="underline bg-none"
                onClick={() => setModal(true)}
              >
                Edit
              </button>
            </td>
            <td className="border border-blue-500 px-4 py-2 text-blue-600 font-medium">
              <button className="underline bg-none">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
