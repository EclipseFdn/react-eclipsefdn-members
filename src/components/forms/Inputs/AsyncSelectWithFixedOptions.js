import React from 'react';
import AsyncSelect from 'react-select/async';

const AsyncSelectWithFixedOptions = ({ value, onChange }) => {

    const promiseOptions = async (inputValue) => {
      return fetch("workingGroups.json", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
          .then(resp => resp.json())
          .then((data) => {
            return data.working_groups.map(item => ({ value: item.id, label: item.name }));
        })
    }

    return (
      <>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          value={value}
          onChange={onChange}
        />

      </>
    );
}

export default AsyncSelectWithFixedOptions