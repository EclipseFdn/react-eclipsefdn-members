import React, { useContext } from "react";
import { useFormikContext } from 'formik';
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelectWrapper";
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';

const WorkingGroups = ({ formField }) => {
  const { values } = useFormikContext()
  const { workingGroup } = formField
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
      { values.workingGroup.value ? 
        <>
          <ParticipationLevel formField={formField} label="Participation Level" />
          <EffectiveDate formField={formField} label="Effective Date" />
        </>
        : null
      }
        <WorkingGroupsRepresentative formField={formField} label="Working Group Representative" />
    </>
  );
};

export default WorkingGroups

