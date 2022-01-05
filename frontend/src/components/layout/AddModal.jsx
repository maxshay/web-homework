import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { CreateTransaction, GetMerchants } from "../../gql";

import { useStore } from "../../store";

export function AddModal() {
  const [serverMessage, setServerMessage] = useState(null);
  const modalOpen = useStore((state) => state.modalOpen);

  const [onCreateHandler] = useMutation(CreateTransaction);

  // get merchants
  const {
    loading: loading2,
    error: error2,
    data: data2 = {},
  } = useQuery(GetMerchants);

  const modalRef = useStore((state) => state.modalRef);
  const setModal = useStore.getState().setModal;

  const handleSubmit = async (values) => {
    let success = false;
    const dataSend = values;
    console.log(values.type);
    if (values.type === "credit") {
      dataSend.credit = true;
    }
    if (values.type === "debit") {
      dataSend.debit = true;
    }
    try {
      const { data, error } = await onCreateHandler({
        variables: dataSend,
      });
      if (error) {
        setServerMessage({ error: "🛑" + JSON.stringify(error) });
      } else {
        setServerMessage({ success: "✅ Transaction record created" });
        success = true;
      }
    } catch (e) {
      setServerMessage({ error: "🛑 Error submitting to server" });
      console.log(e);
    }
    return success;
  };

  if (!modalOpen) return null;
  if (loading2 || !modalRef) return "loading";
  if (error2) return "error";

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-100 bg-opacity-90${
        modalOpen === true ? "" : " hidden"
      }`}
    >
      <div className="flex justify-center align-middle items-center h-full">
        <div className="relative modalMain w-full sm:w-1/2 lg:w-1/4 bg-white rounded shadow">
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
                    credit: false,
                    debit: false,
                    type: "",
                    category: "",
                    description: "",
                    merchantId: "",
                    userId: modalRef,
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.description) {
                      errors.description = "! Description must not be empty";
                    }
                    if (!values.amount) {
                      errors.amount = "! Amount must not be empty";
                    } else {
                      if (values.amount < 0)
                        errors.amount =
                          "! Amount must be positive non-zero integer";
                    }
                    if (!values.type) {
                      errors.type = "! Payment type must not be empty";
                    }
                    if (!values.category) {
                      errors.category = "! Category must not be empty";
                    }
                    if (!values.merchantId) {
                      errors.merchantId = "! Merchant must not be empty";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    const success = await handleSubmit(values);
                    if (success)
                      resetForm({
                        values: {
                          amount: "",
                          credit: false,
                          debit: false,
                          type: "",
                          category: "",
                          description: "",
                          merchantId: "",
                          userId: modalRef,
                        },
                      });
                    else resetForm({ values: { ...values } });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* description */}
                      <div className="mt-5">
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
                          className="text-red-600 text-sm text-right mt-1"
                        />
                      </div>

                      {/* category */}
                      <div className="mt-5">
                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category &#x2a;
                          </label>
                          <Field
                            component="select"
                            name="category"
                            id="category"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="" label="Select Category" />

                            <option value="food">Food</option>
                            <option value="health and wellness">
                              Health and wellness
                            </option>
                            <option value="transportation">
                              Transportation
                            </option>
                            <option value="entertainment">Entertainment</option>
                            <option value="other">Other</option>
                          </Field>
                        </div>
                      </div>
                      <div className="errorMessage__spacing">
                        <ErrorMessage
                          name="category"
                          component="div"
                          className="text-red-600 text-sm text-right mt-1"
                        />
                      </div>

                      {/* amount */}
                      <div className="mt-5">
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
                          className="text-red-600 text-sm text-right mt-1"
                        />
                      </div>

                      {/* type */}
                      <div className="mt-5">
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
                          className="text-red-600 text-sm text-right mt-1"
                        />
                      </div>

                      {/* merchant */}
                      <div className="mt-5">
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
                      <div className="errorMessage__spacing">
                        <ErrorMessage
                          name="merchantId"
                          component="div"
                          className="text-red-600 text-sm text-right mt-1"
                        />
                      </div>
                      <div className="mt-6">
                        <button
                          className="mainButton w-full leading-4 "
                          style={{ padding: ".75rem", textAlign: "center" }}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting === true ? (
                            <div className="spinner-border"></div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                      {serverMessage?.error && (
                        <div className="bg-red-400 p-1 mt-2">
                          {serverMessage.error}
                        </div>
                      )}
                      {serverMessage?.success && (
                        <div className="bg-green-400 p-1 mt-2">
                          {serverMessage.success}
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
