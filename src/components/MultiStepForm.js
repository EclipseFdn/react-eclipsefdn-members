import React, { useState, useContext } from "react";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
import WorkingGroups from "./forms/WorkingGroups";
import ParticipationLevel from "./forms/ParticipationLevel";
import EffectiveDate from './forms/EffectiveDate';
import WorkingGroupRepresentative from './forms/WorkingGroupRepresentative';
import SigningAuthority from './forms/SigningAuthority';
import Preview from "./forms/Preview";
import { formField } from './formModels/formFieldModel';
import MembershipContext from "./MembershipContext";

const MultiStepForm = ({ defineInitialData, step, setStep }) => {
  const {isExistingMember} = useContext(MembershipContext)
  const [formDataStates, setFormDataStates] = useState(defineInitialData)
  const [showHidden, setShowHidden] = useState(false)

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }

  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={formDataStates}
        onSubmit={handleSubmit}
        formDataStates={formDataStates}
        setFormDataStates={setFormDataStates}
        step={step}
        setStep={setStep}
      >
        <CompanyInformation formField={formField} label="Company Information" skipped={isExistingMember ? true : false} />
        <MembershipLevel formField={formField} label="Membership Level" skipped={isExistingMember ? true : false} />
        <WorkingGroups formField={formField} label="Working Groups" />
        <ParticipationLevel formField={formField} label="Participation Level" />
        <EffectiveDate formField={formField} label="Effective Date" />
        <WorkingGroupRepresentative formField={formField} label="Working Group Representative" />
        <SigningAuthority formField={formField} showHidden={showHidden} setShowHidden={setShowHidden} formDataStates={formDataStates} label="Signing Authority" />
        <Preview formField={formField} previewData={formDataStates} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm