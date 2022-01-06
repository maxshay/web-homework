import React from "react";
import { SpecialNumbers } from "..";
import { useMutation } from "@apollo/client";

import { DeleteTransaction } from "../../gql";

export function UserTransactionTable({ data, onDeleteHandler }) {
  const handleDelete = async (id) => {
    if (confirm("are you sure you want to delete?") == true) {
      const { data, error } = onDeleteHandler({ variables: { id } });
      if (error) {
        alert("Server error, could not delete record");
      } else {
        alert("record deleted");
      }
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-400">Date</th>
          <th className="px-4 py-2 border border-gray-400">Desc.</th>
          <th className="px-4 py-2 border border-gray-400">Amount</th>
          <th className="px-4 py-2 border border-gray-400">Category</th>
          <th className="px-4 py-2 border border-gray-400">Type</th>
          <th className="px-4 py-2 border border-gray-400"></th>
          <th className="px-4 py-2 border border-gray-400"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {r.insertedAt.replace("T", " ")}
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {r.description}
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              <SpecialNumbers amount={r.amount} />
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {r.category}
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              {r.credit === true
                ? "Credit"
                : r.debit === true
                ? "Debit"
                : "Other"}
            </td>
            <td className="border border-gray-400 px-4 py-2font-medium">
              <button
                className="underline bg-none"
                onClick={() => navigate(`/transaction/${r.id}`)}
              >
                Edit
              </button>
            </td>
            <td className="border border-gray-400 px-4 py-2 font-medium">
              <button
                className="underline bg-none"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
