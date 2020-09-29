import React from "react";
import Input from './Inputs/Input';

const SigningAuthorityInfo = ({ formField }) => {

    const {
        signingAuthorityFirstName,
        signingAuthorityLastName,
        signingAuthorityJobTitile,
        signingAuthorityEmail
      } = formField;

    return (
      <>
        <h3>Who should be the signing authority?</h3>
        <hr />
        <Input name={signingAuthorityFirstName.name} labelName={signingAuthorityFirstName.label} placeholder={signingAuthorityFirstName.placeholder} />
        <Input name={signingAuthorityLastName.name} labelName={signingAuthorityLastName.label} placeholder={signingAuthorityLastName.placeholder} />
        <Input name={signingAuthorityJobTitile.name} labelName={signingAuthorityJobTitile.label} placeholder={signingAuthorityJobTitile.placeholder} />
        <Input name={signingAuthorityEmail.name} labelName={signingAuthorityEmail.label} placeholder={signingAuthorityEmail.placeholder} />
      </>
    )
}

export default SigningAuthorityInfo