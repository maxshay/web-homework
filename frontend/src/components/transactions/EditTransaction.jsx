import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export function EditTransaction() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="font-bold text-xl text-gray-400 mt-4">Edit Transaction</h2>
      <br />
      Edit {id}
      <div className="form">
        <Formik
          initialValues={{
            amount: "",
            credit: "",
            debit: "",
            description: "",
            merchantId: "",
          }}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          onSubmit={(values) => {}}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <div className="px-4 py-5 bg-white sm:p-6"></div>

                <div className="px-4 py-6 bg-gray-50 sm:px-6">
                  <button
                    className="w-full leading-4 p-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Review
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
