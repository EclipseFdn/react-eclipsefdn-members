import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { Field } from "formik";
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

  // const [field, { setValue }] = useField(props.field.name)

  const handleSelect = (option, action) => {
    console.log(option)
    props.form.setFieldValue(props.field.name, option);
    if (option.address) {
      props.form.setFieldValue('street', option.address.street);
      props.form.setFieldValue('city', option.address.city);
      props.form.setFieldValue('provinceOrState', option.address.provinceOrState);
      props.form.setFieldValue('country', option.address.country);
      props.form.setFieldValue('postalCode', option.address.postalCode);
    }
  }

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
    <AsyncCreatableSelect
      {...props.field}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onChange={(option, action) => {
        handleSelect(option, action);
      }}
    />
  );

}




export default CustomSelectWrapper