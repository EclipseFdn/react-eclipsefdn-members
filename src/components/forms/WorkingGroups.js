import React from "react";
import Select from './Inputs/Select';

const WorkingGroups = ({ formField }) => {
  const {
    workingGroup
  } = formField;

  const dropdownOptions = [
    { name: 'Select a group', value: '' },
    { name: 'group 1', value: 'g1' },
    { name: 'group 2', value: 'g2' },
    { name: 'I do not want to join a working group at this time', value: 'none' }
  ]

  return (
    <>
      <h4>Which working group would you like to join? </h4>
      <Select
        label={workingGroup.label}
        name={workingGroup.name}
        options={dropdownOptions}
      />
    </>
  );
};

export default WorkingGroups

