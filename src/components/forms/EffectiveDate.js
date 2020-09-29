import React from "react";
import DateInput from './Inputs/DateInput';

const EffectiveDate = ({ formField }) => {
  const {
    effectiveDate
  } = formField;

  return (
    <DateInput label={effectiveDate.label} name={effectiveDate.name} />
  )
}

export default EffectiveDate