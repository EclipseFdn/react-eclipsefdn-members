import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

const AsyncSelect = ({ value, onChange }) => {

    const promiseOptions = (inputValue) => {
      return fetch("companies.json", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
          .then(resp => resp.json())
          .then((data) => {
            console.log(data.companies)
            return data.companies.map(item => ({ value: item.name, label: item.name, address: item.address }));
        })
    }

    return (
        <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          value={value}
          onChange={onChange}
        />
    );
}

export default AsyncSelect