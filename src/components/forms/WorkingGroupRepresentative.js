import React from "react";
import Input from './Inputs/Input';
import { mapField } from '../formModels/formFieldModel';

const WorkingGroupRepresentative = ({ formField }) => {

  const {
    wgRepresentative
  } = formField;
  
  return (
    <>
      <h3>Who is the working group representative?</h3>
      <hr />
      { mapField(wgRepresentative).map(el => <Input name={`wgRepresentative.${el}`} labelName={el} placeholder={el} key={el} />) }
    </>
  );
};

export default WorkingGroupRepresentative