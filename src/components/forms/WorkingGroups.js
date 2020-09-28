import React from "react";
import { Field } from "formik";
// import { WizardStep } from "../forms/FormWizard";

const WorkingGroups = () => {

  return (
    <>
      <h4>Which working group would you like to join? </h4>
      <Field name="workingGroup" component="select">
        <option value="" label="Select a group" />
        <option value="g1" label="group 1" />
        <option value="g2" label="group 2" />
        <option value="none" label="I do not want to join a working group at this time" />
      </Field>
    </>
  );
};

export default WorkingGroups
