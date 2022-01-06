import { Field, ErrorMessage } from "formik";

function FormFieldSelect({
  name,
  title,
  required,
  options,
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
        <Field
          component="select"
          name={name}
          id={name}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" label={placeholder} />
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Field>
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

export default FormFieldSelect;
