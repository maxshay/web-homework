import React from "react";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { CreateTransaction } from "../../gql";

import { useStore } from "../../store";

export function AddModal() {
  const [onCreateHandler, { data, loading, error }] =
    useMutation(CreateTransaction);

  const modalOpen = useStore((state) => state.modalOpen);
  const setModal = useStore.getState().setModal;

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-100 bg-opacity-90${
        modalOpen === true ? "" : " hidden"
      }`}
    >
      <div className="flex justify-center align-middle items-center h-full d">
        <div className="relative modalMain w-1/2 h-1/2 bg-white rounded shadow">
          <div className="absolute top-4 right-4">
            <button onClick={() => setModal(false)}>Close</button>
          </div>
          <div className="content p-4 h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2>Add Transaction</h2>
              </div>
              <div>
                <button>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
