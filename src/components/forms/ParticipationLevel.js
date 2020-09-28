import React from "react";
import { Field } from "formik";
// import { WizardStep } from "../forms/FormWizard";

const ParticipationLevel = () => {

  return (
    <>
      <h4>What is your intended participation level?</h4>
      <Field name="participationLevel" component="select">
        <option value="" label="Select a level" />
        <option value="l1" label="level 1" />
        <option value="l2" label="level 2" />
        <option value="l3" label="level 3" />
      </Field>
    </>
  );
};

export default ParticipationLevel