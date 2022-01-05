import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { GetMerchants, GetTransaction, UpdateTransaction } from "../../gql";

export function EditTransaction() {
  const [serverMessage, setServerMessage] = useState(null);

  const { id } = useParams();

  // get merchants
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetTransaction, {
    variables: { id },
  });
  const {
    loading: loading2,
    error: error2,
    data: data2 = {},
  } = useQuery(GetMerchants);

  const [onUpdateHandler] = useMutation(UpdateTransaction);

  const handleSubmit = async (values) => {
    let success = false;
    const dataSend = values;
    if (values.type === "credit") {
      dataSend.credit = true;
      dataSend.debit = false;
    } else if (values.type === "debit") {
      dataSend.debit = true;
      dataSend.credit = false;
    } else {
      dataSend.debit = false;
      dataSend.credit = false;
    }
    dataSend.id = id;
    try {
      const { data, error } = await onUpdateHandler({
        variables: dataSend,
      });
      if (error) {
        setServerMessage({ error: "🛑" + JSON.stringify(error) });
      } else {
        setServerMessage({ success: "✅ Transaction record updated" });
        success = true;
      }
    } catch (e) {
      setServerMessage({ error: "🛑 Error submitting to server" });
      console.log(e);
    }
    return success;
  };

  if (loading || loading2) return <div className="mt-5">loading...</div>;
  if (error || error2) return <div className="mt-5">error</div>;

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-400 mt-4">Edit Transaction</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="form col-span-1">
          <Formik
            initialValues={{
              amount: data.transaction.amount,
              credit: data.transaction.credit,
              debit: data.transaction.debit,
              type:
                data.transaction.debit === true
                  ? "debit"
                  : data.transaction.credit === true
                  ? "credit"
                  : "other",
              description: data.transaction.description,
              category: data.transaction.category,
              merchantId: data.transaction.merchant.id,
              userId: data.transaction.user.id,
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
                  errors.amount = "! Amount must be positive non-zero integer";
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
                      <option value="transportation">Transportation</option>
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
        <div></div>
      </div>
    </div>
  );
}
