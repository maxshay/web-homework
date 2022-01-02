import React from "react";
import { useParams } from "react-router-dom";

export function EditTransaction() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-400 mt-4">Edit Transaction</h2>
      <br />
      Edit {id}
    </div>
  );
}
