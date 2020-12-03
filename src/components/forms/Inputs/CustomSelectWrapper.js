import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { Field, useField } from "formik";
// import Select from 'react-select';

const CustomSelectWrapper = ({ name }) => {

  return (
    <Field
      name={name}
      component={CustomSelect}
    />
  )
}

const CustomSelect = (props) => {

  const [field, { setValue }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value);
  };

  // function updateBlur() {
  //   form.setFieldTouched(field.name, true);
  // }

  // function getValue() {
  //   if (options) {
  //     return options.find(option => option.value === field.value);
  //   } else {
  //     return []
  //   }
  // }

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const promiseOptions = async (inputValue) => {
    return fetch("companies.json", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then(resp => resp.json())
        .then((data) => {
          return data.companies.map(item => ({ value: item.name, label: item.name, address: item.address }));
      })
  }
  return (
    <>
    <label htmlFor={field.name}>Company</label>
    <AsyncCreatableSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onChange={onChange}
    />
    {/* <Select
      options={options}
      value={getValue()}
      name={field.name}
      onChange={handleOptionChange}
      {...field}
    /> */}
    </>
  )

}




export default CustomSelectWrapper