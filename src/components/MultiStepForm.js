import React, { useState } from "react";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
import WorkingGroups from "./forms/WorkingGroups";
import ParticipationLevel from "./forms/ParticipationLevel";
import EffectiveDate from './forms/EffectiveDate';
import WorkingGroupRepresentative from './forms/WorkingGroupRepresentative';
import SigningAuthority from './forms/SigningAuthority';
import Preview from "./forms/Preview";
import { initialValues } from './formModels/formInitialValues';
import { formField } from './formModels/formFieldModel';

const MultiStepForm = () => {

  const [formDataStates, setFormDataStates] = useState(initialValues)
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
      >

        <CompanyInformation formField={formField} />
        <MembershipLevel formField={formField} />
        <WorkingGroups formField={formField} />
        <ParticipationLevel formField={formField} />
        <EffectiveDate formField={formField} />
        <WorkingGroupRepresentative formField={formField} />
        <SigningAuthority formField={formField} showHidden={showHidden} setShowHidden={setShowHidden} />
        <Preview formField={formField} previewData={formDataStates} />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm