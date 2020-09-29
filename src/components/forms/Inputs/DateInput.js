import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  const { label, name, ...rest } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field, meta }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <>
            <DatePicker 
              id={name}
              {...field}
              {...rest}
              selected={(value && new Date(value)) || null}
              onChange={val => setFieldValue(name, new Date(val).toLocaleDateString())}
            />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
            </>
          )
        }}
      </Field>
    </>
  )
}

export default DateInput