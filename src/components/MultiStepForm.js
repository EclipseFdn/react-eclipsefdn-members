import React, { useState } from "react";
// import { Wizard } from "./forms/FormWizard";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
import WorkingGroups from "./forms/WorkingGroups";
import ParticipationLevel from "./forms/ParticipationLevel";
// import EffectiveDate from './forms/EffectiveDate';
import Preview from "./forms/Preview";

const MultiStepForm = () => {

  const [formDataStates, setFormDataStates] = useState({
    organizationName: "",
    street: "",
    city: "",
    provinceOrState: "",
    country: "",
    postalCode: "",
    twitterHandle: "",
    representativeFirstName: "",
    representativeLastName: "",
    representativeEmail: "",
    membershipLevel: "",
    workingGroup: "",
    participationLevel: ""
  })
  
  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }

  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={{ ...formDataStates }}
        onSubmit={handleSubmit}
        formDataStates={formDataStates}
        setFormDataStates={setFormDataStates}
        // validate={validate}
      >

        <CompanyInformation label="first" />
        <MembershipLevel label="second" />
        <WorkingGroups label="third" />
        <ParticipationLevel label="forth" />
        {/* <EffectiveDate label='Pick a date' name='effectiveDate' /> */}
        <Preview label="sixth" previewData={formDataStates} />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm