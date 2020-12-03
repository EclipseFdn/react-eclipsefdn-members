import React, { useContext } from "react";
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelectWrapper";

const WorkingGroups = ({ formField }) => {
  const {
    workingGroup
  } = formField;
  const {isExistingMember} = useContext(MembershipContext)
  return (
    <>
      <h4>Which working group would you like to join? </h4>
      <CustomSelectWrapper
        // label={workingGroup.label}
        name={workingGroup.name}
        srcData="workingGroups"
        isExistingMember={isExistingMember}
      />
    </>
  );
};

export default WorkingGroups

