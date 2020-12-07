import React from "react";
import Input from './Inputs/Input';
import { mapField } from '../formModels/formFieldModel';

const SigningAuthorityInfo = ({ formField }) => {

  const {
    signingAuthorityRepresentative
    } = formField;
  
  return (
    <>
      <h3>Who should be the signing authority?</h3>
      <hr />
      { mapField(signingAuthorityRepresentative).map(el => <Input name={`signingAuthorityRepresentative.${el}`} labelName={el} placeholder={el} key={el} />) }
    </>
    )
}

export default SigningAuthorityInfo