import React from "react";

import { Field, ErrorMessage } from "formik";

function FormFieldText({
  name,
  title,
  type,
  required,
  placeholder,
  className,
  ...rest
}) {
  return (
    <div className={className} {...rest}>
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {title}
          {required && <> &#x2a;</>}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Field
            type={type}
            name={name}
            id={name}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="errorMessage__spacing">
        {required && (
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-600 text-sm text-right mt-1"
          />
        )}
      </div>
    </div>
  );
}

export default FormFieldText;
