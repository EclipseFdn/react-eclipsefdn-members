import React from "react";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EffectiveDate = (props) => {
    const { label, name, ...rest } = props
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form
            const { value } = field
            return (
              <DatePicker 
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={val => setFieldValue(name, val)}
              />
            )
          }}
        </Field>
      </>
    )
}

export default EffectiveDate