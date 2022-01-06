import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Formik, Form } from "formik";
import FormFieldSelect from "../forms/FormFieldSelect";
import FormFieldText from "../forms/FormFieldText";

import { useMutation, useQuery } from "@apollo/client";
import { CreateTransaction, GetMerchants, GetUser } from "../../gql";
import produce from "immer";

import { useStore } from "../../store";

export function AddModal({ userId, setShowModal }) {
  const [serverMessage, setServerMessage] = useState(null);
  const modalOpen = useStore((state) => state.modalOpen);

  const [onCreateHandler] = useMutation(CreateTransaction);

  // get merchants
  const {
    loading: loading2,
    error: error2,
    data: data2 = {},
  } = useQuery(GetMerchants);

  // Submit transaction function
  const handleSubmit = async (values) => {
    setServerMessage(null);

    let success = false;
    const dataSend = values;
    if (values.type === "credit") {
      dataSend.credit = true;
    }
    if (values.type === "debit") {
      dataSend.debit = true;
    }
    try {
      const { data, error } = await onCreateHandler({
        variables: dataSend,
        update: (store, { data }) => {
          const userData = store.readQuery({
            query: GetUser,
            variables: { id: userId },
          });

          store.writeQuery({
            query: GetUser,
            variables: { id: userId },
            data: produce(userData, (x) => {
              x.user.transactions = [
                ...userData.user.transactions,
                data.createTransaction,
              ];
            }),
          });
        },
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

  if (loading2) return "loading";
  if (error2) return "error";

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-100 bg-opacity-90">
      <div className="flex justify-center align-middle items-center h-full">
        <div className="modalMain relative w-full sm:w-1/2 lg:w-1/4 bg-white rounded shadow">
          <div className="absolute top-4 right-4">
            <button onClick={() => setShowModal(false)}>Close</button>
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
                    userId: userId,
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
                          userId: userId,
                        },
                      });
                    else resetForm({ values: { ...values } });
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
                        className="mt-5"
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
                        options={data2.merchants.map((m) => ({
                          key: m.id,
                          label: m.name,
                        }))}
                        className="mt-5"
                      />

                      {/* submit */}
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
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
