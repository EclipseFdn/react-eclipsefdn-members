import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from 'react-select';
import TextError from './TextError';

const MultiSelect = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
             {({
               field, // { name, value, onChange, onBlur }
               form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => (
                <Select options={options} isMulti name={name} value={options ? options.find(option => option.value === field.value) : ''} onChange={(option) => form.setFieldValue(field.name, option.value)} />
             )}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </>
  )
}

export default MultiSelect