import React from "react";
import Select from './Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';

const MembershipLevel = ({ formField }) => {
  const {
    membershipLevel
  } = formField;

  const dropdownOptions = [
    { name: 'Select a level', value: '' },
    { name: 'Strategic Members', value: 'l1' },
    { name: 'Contributing Members (formerly referred to as Solutions Members)', value: 'l2' },
    { name: 'Associate Members', value: 'l3' },
    { name: 'Committer Members', value: 'l4' }
  ]

  return (
    <>
      <h4>What is your intended Membership Level? </h4>
      <Select
        label={membershipLevel.label}
        name={membershipLevel.name}
        options={dropdownOptions}
      />
      <p>The table is from here https://www.eclipse.org/membership/documents/membership-prospectus.pdf</p>
      <MembershipFeeTable />
    </>
  );
};

export default MembershipLevel
