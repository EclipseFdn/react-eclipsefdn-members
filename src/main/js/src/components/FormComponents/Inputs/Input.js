import React from 'react';
import { Field } from 'formik';

const Input = ({ name, labelName, placeholder, disableInput, requiredMark }) => {

  return (
    <>
    <label htmlFor={name}>{labelName}</label>
    {requiredMark && <span className="orange-star margin-left-5">*</span>}
    <br />
    <Field name={name}>
      {({
        field,
        form: { touched, errors },
        meta,
      }) => {
        return (
        <>
          <input {...field} id={name} className={`form-control margin-bottom-10 ${meta.touched && meta.error ? "form-border-error" : ""}`} type="text" placeholder={placeholder} disabled={disableInput} />
        </>
      )}}
    </Field>
    </>
  )
}

export default Input