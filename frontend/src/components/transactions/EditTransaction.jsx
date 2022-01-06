import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { GetTransactionAndMerchants, UpdateTransaction } from "../../gql";

import FormFieldSelect from "../forms/FormFieldSelect";
import FormFieldText from "../forms/FormFieldText";

export function EditTransaction() {
  const [serverMessage, setServerMessage] = useState(null);

  const { id } = useParams();

  // get merchants
  const {
    loading,
    error,
    data = {},
  } = useQuery(GetTransactionAndMerchants, {
    variables: { transactionId: id },
  });

  const [onUpdateHandler] = useMutation(UpdateTransaction);

  const handleSubmit = async (values) => {
    setServerMessage(null);
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

  if (loading) return <div className="mt-5">loading...</div>;
  if (error)
    return (
      <div className="mt-5">
        🛑 error
        <br />
        <pre>
          <code>Could not get transaction or does not exist</code>
        </pre>
      </div>
    );

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
            onSubmit={async (values, { resetForm }) => {
              const success = await handleSubmit(values);
              if (!success) resetForm({ values: { ...values } });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* description */}

                <FormFieldText
                  name="description"
                  title="Description"
                  type="text"
                  placeholder="Describe the purchase"
                  className="my-5"
                  required={true}
                />

                {/* category */}
                <FormFieldSelect
                  name="category"
                  title="Category"
                  placeholder="Select Category"
                  required={true}
                  options={[
                    { key: "food", label: "Food" },
                    {
                      key: "health and wellness",
                      label: "Health and wellness",
                    },
                    { key: "transportation", label: "Transportation" },
                    { key: "entertainment", label: "Entertainment" },
                    { key: "other", label: "Other" },
                  ]}
                  className="mt-5"
                />

                {/* amount */}
                <FormFieldText
                  name="amount"
                  title="Amount ($)"
                  type="number"
                  placeholder="Purchase Price In Whole Dollars"
                  className="mt-5"
                  required={true}
                />

                {/* type */}
                <FormFieldSelect
                  name="type"
                  title="Payment Type"
                  placeholder="Select Payment Type"
                  required={true}
                  options={[
                    { key: "debit", label: "Debit" },
                    { key: "credit", label: "Credit" },
                    { key: "other", label: "Other" },
                  ]}
                  className="mt-5"
                />

                {/* merchant */}
                <FormFieldSelect
                  name="merchantId"
                  title="Merchant"
                  placeholder="Select Merchant"
                  required={true}
                  options={data.merchants.map((m) => ({
                    key: m.id,
                    label: m.name,
                  }))}
                  className="mt-5"
                />

                {/* submit */}
                <div className="my-6">
                  <button
                    className="mainButton w-full leading-4 text-center"
                    style={{ padding: ".75rem", textAlign: "center" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting === true ? (
                      <div className="spinner-border"></div>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>

                {/* server messages */}
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
  );
}
