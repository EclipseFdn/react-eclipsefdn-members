import React, { useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

const CustomAsyncSelect = (props) => {

  useEffect(() => {
    // When has initial data and has not been changed, show prefilled address data and disable input
    if (props.isExistingMember && props.organiazationData && props.field.value && props.field.value.value === props.organiazationData.legal_name) {
      props.setDisableInput(true)
    }
  }, [props])

  const handleSelect = (option, action) => {

    if (option && !option.__isNew__ && action !== "clear") {
      if (props.srcData === "companies") {
        // Prefill existing data to selected companies
        props.form.setFieldValue("organization.legalName", option)
        props.form.setFieldValue("organization.address.street", option.address.street)
        props.form.setFieldValue("organization.address.postalCode", option.address.postalCode)
        props.form.setFieldValue("organization.address.city", option.address.city)
        props.form.setFieldValue('organization.twitterHandle', option.twitterHandle)
        props.setDisableInput(true)
      }

      if (props.srcData === "workingGroups") {
        props.form.setFieldValue("workingGroup", option)
      }
    }

    if (action.action === "clear") {
      // Clear prefilled data when clear the selection
      if (props.srcData === "companies") {
        props.form.setFieldValue("organization.legalName", "")
        props.form.setFieldValue("organization.address.street", "")
        props.form.setFieldValue("organization.address.city", "")
        props.form.setFieldValue("organization.address.provinceOrState", "")
        props.form.setFieldValue("organization.address.country", "")
        props.form.setFieldValue("organization.address.postalCode", "")
        props.setDisableInput(false)
      }
    }

    if (option && option.__isNew__) {
      // When create new organization that are not in our data
      props.form.setFieldValue("organization.legalName", option)
      props.setDisableInput(false)
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

    // Will use this if the api supports search
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
            return data.companies.map(item => ({ value: item.legalName, label: item.legalName, address: item.address, twitterHandle: item.twitterHandle }));
          }
          if (data.working_groups) {
            if (props.isExistingMember) {
              return data.working_groups.map(item => ({ value: item.id, label: item.name, participation_levels: item.participation_levels}));
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
        isClearable
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        defaultValue={props.field.value || ""}
        onChange={(option, action) => {
          handleSelect(option, action)
        }}
      />
    )
  }

  return (
    <AsyncSelect
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      defaultValue={props.field.value}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
    />
  )

}

export default CustomAsyncSelect