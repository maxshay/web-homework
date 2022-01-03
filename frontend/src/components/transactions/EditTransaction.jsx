import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery } from "@apollo/client";
import { GetMerchants, GetTransaction } from "../../gql";

export function EditTransaction() {
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

  const handleSubmit = (values) => {
    console.log(values);
  };

  if (loading || loading2) return <div className="mt-5">loading...</div>;
  if (error || error2) return <div className="mt-5">error</div>;

  console.log(data);

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
              merchantId: data.transaction.merchant.id,
              userId: data.transaction.user.id,
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
        <div></div>
      </div>
    </div>
  );
}
