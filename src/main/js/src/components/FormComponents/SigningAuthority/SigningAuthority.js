import React from 'react';
import Input from '../Inputs/Input';

const SigningAuthority = ({ formField }) => {
  const { signingAuthorityRepresentative } = formField;
  return (
    <>
    <h2 className="fw-600">Signing Authority</h2>
    <p>Please Indicate the individual who has the signing authority for the agreement</p>

    <div className="row">
      { signingAuthorityRepresentative.map((el, index) => (
        <div key={index} className="col-md-12">
          <Input name={el.name} labelName={el.label} placeholder={el.placeholder} requiredMark={true} />
        </div>
      )) }
    </div>
    </>
  )

}

export default SigningAuthority