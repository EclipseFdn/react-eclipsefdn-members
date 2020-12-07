import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { Field } from "formik";

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput }) => {

  return (
    <Field
      name={name}
      component={CustomSelect}
      srcData={srcData}
      isExistingMember={isExistingMember}
      setDisableInput={setDisableInput}
    />
  )
}

const CustomSelect = (props) => {

  // if (props.isExistingMember && hasCompanyValues) {

  // }

  const handleSelect = (option, action) => {
    props.form.setFieldValue(props.field.name, option)
    if (option.address) {
      for(const property in option.address) {
        props.form.setFieldValue(`organization.address.${property}`, option.address[property])
      }
      props.setDisableInput(true)
      
    }
    if (option.twitter) {
      props.form.setFieldValue('organization.twitterHandle', option.twitter);
    }
  }

  const promiseOptions = async (inputValue) => {
    let src_data
    if (props.srcData === "companies") {
      src_data = "companies.json"
    }
  
    if (props.srcData === "workingGroups") {
      src_data = "workingGroups.json"
    }

    // if(inputValue) {
    //   src_data = src_data + `?search=${inputValue}`
    // }

    return fetch(src_data, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then(resp => resp.json())
        .then((data) => {
          if (data.companies) {
            return data.companies.map(item => ({ value: item.name, label: item.name, address: item.address, twitter: item.twitter }));
          }
          if (data.working_groups) {
            if (props.isExistingMember) {
              return data.working_groups.map(item => ({ value: item.name, label: item.name, participation_levels: item.participation_levels}));
            }
            else {
              let tempData = data.working_groups.map(item => ({ value: item.id, label: item.name, participation_levels: item.participation_levels }))
              tempData.push({ label: 'I do not want to join a working group at this time', value: '' })
              return tempData
            }
          }
          else return []
      })
  }

  if (props.srcData === "companies") {
    return (
      <AsyncCreatableSelect
        {...props.field}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        onChange={(option, action) => {
          handleSelect(option, action)
        }}
      />
    );
  }

  return (
    <AsyncSelect
      {...props.field}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
    />
  )

}

export default CustomSelectWrapper