import React from "react";
import Select from './Inputs/Select';

const MembershipLevel = ({ formField }) => {
  const {
    membershipLevel
  } = formField;

  const dropdownOptions = [
    { name: 'Select a level', value: '' },
    { name: 'Level 1', value: 'l1' },
    { name: 'Level 2', value: 'l2' },
    { name: 'Level 3', value: 'l3' }
  ]

  return (
    <>
      <h4>What is your intended Membership Level? </h4>
      <Select
        label={membershipLevel.label}
        name={membershipLevel.name}
        options={dropdownOptions}
      />
    </>
  );
};

export default MembershipLevel
