import { Field, ErrorMessage } from "formik";

function FormFieldText({
  name,
  title,
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
            type="text"
            name={name}
            id={name}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-sm"
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="errorMessage__spacing">
        {required && (
          <ErrorMessage
            name={name}
            component="div"
            className=" text-red-600 text-sm text-right"
          />
        )}
      </div>
    </div>
  );
}

export default FormFieldText;
