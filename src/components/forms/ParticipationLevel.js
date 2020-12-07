import React from "react";
import { Field } from "formik";

const ParticipationLevel = ({formField, label, participationLevels}) => {

  return (
    <>
      <h4>What is your intended participation level?</h4>
      <Field name="participationLevel" component="select">
        <option value="" label="Select a level" />
        { participationLevels?.map(el => <option value={el} label={el} key={el} />) }
      </Field>
    </>
  );
};

export default ParticipationLevel