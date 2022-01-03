import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CreateTransaction, GetMerchants } from "../../gql";

import { useStore } from "../../store";

export function AddModal() {
  const [onCreateHandler, { data, loading, error }] =
    useMutation(CreateTransaction);

  // get merchants
  const {
    loading: loading2,
    error: error2,
    data: data2 = {},
  } = useQuery(GetMerchants);

  const modalOpen = useStore((state) => state.modalOpen);
  const modalRef = useStore((state) => state.modalRef);
  const setModal = useStore.getState().setModal;

  const handleSubmit = (values) => {
    console.log(values);
  };

  if (loading2 || !modalRef) return "loading";
  if (error2) return "error";

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-100 bg-opacity-90${
        modalOpen === true ? "" : " hidden"
      }`}
    >
      <div className="flex justify-center align-middle items-center h-full d">
        <div className="relative modalMain w-1/2 bg-white rounded shadow">
          <div className="absolute top-4 right-4">
            <button onClick={() => setModal(false)}>Close</button>
          </div>
          <div className="content p-6 h-full">
            <div className="h-full">
              <div>
                <h2>Add Transaction</h2>
                <Formik
                  initialValues={{
                    amount: "",
                    credit: "",
                    debit: "",
                    type: "",
                    description: "",
                    merchantId: "",
                    userId: modalRef,
                  }}
                  validate={(values) => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* description */}
                      <div className="my-5">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description &#x2a;
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <Field
                            type="text"
                            name="description"
                            id="description"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Describe the purchase"
                          />
                        </div>
                      </div>

                      <div className="errorMessage__spacing">
                        <ErrorMessage
                          name="description"
                          component="div"
                          className=" text-red-600 text-sm text-right"
                        />
                      </div>

                      {/* amount */}
                      <div className="my-5">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount &#x2a;
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <Field
                            type="number"
                            name="amount"
                            id="amount"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Purchase Price"
                          />
                        </div>
                      </div>

                      <div className="errorMessage__spacing">
                        <ErrorMessage
                          name="amount"
                          component="div"
                          className=" text-red-600 text-sm text-right"
                        />
                      </div>

                      {/* type */}
                      <div className="my-5">
                        <div>
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Payment Type &#x2a;
                          </label>
                          <Field
                            component="select"
                            name="type"
                            id="type"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" label="Select Payment Type" />

                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                            <option value="other">Other</option>
                          </Field>
                        </div>
                      </div>
                      <div className="errorMessage__spacing">
                        <ErrorMessage
                          name="type"
                          component="div"
                          className=" text-red-600 text-sm text-right"
                        />
                      </div>

                      {/* merchant */}
                      <div className="my-5">
                        <div>
                          <label
                            htmlFor="merchantId"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Merchant &#x2a;
                          </label>
                          <Field
                            component="select"
                            name="merchantId"
                            id="merchantId"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" label="Select Merchant" />
                            {data2.merchants.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="my-6">
                        <button
                          className="mainButton w-full leading-4 text-center"
                          style={{ padding: ".75rem" }}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
