import React from "react";
import DateInput from './Inputs/DateInput';

const EffectiveDate = ({ formField }) => {
  const {
    effectiveDate
  } = formField;

  return (
    <>
    <h4>What is the effective date for your Membership Agreement/ Working Group Participation Agreement?</h4>
    <DateInput label={effectiveDate.label} name={effectiveDate.name} />
    </>
  )
}

export default EffectiveDate