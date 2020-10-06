import React, { useContext } from "react";
import Select from './Inputs/Select';
import MembershipContext from "../MembershipContext";

const WorkingGroups = ({ formField }) => {
  const {
    workingGroup
  } = formField;
  const {isExistingMember} = useContext(MembershipContext)

  const dropdownOptions = [
    { name: 'Select a group', value: ''},
    { name: 'group 1', value: 'g1' },
    { name: 'group 2', value: 'g2' },
    { name: 'I do not want to join a working group at this time', value: 'none' }
  ]

  const dropdownOptionsForExistingMember = [
    { name: 'Select a group', value: '' },
    { name: 'group 1', value: 'g1' },
    { name: 'group 2', value: 'g2' }
  ]

  return (
    <>
      <h4>Which working group would you like to join? </h4>
      <Select
        label={workingGroup.label}
        name={workingGroup.name}
        options={ isExistingMember ? dropdownOptionsForExistingMember : dropdownOptions}
      />
    </>
  );
};

export default WorkingGroups

