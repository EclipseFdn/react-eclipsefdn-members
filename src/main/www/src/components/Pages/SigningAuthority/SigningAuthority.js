import React from 'react';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import Input from '../../UIComponents/Inputs/Input';

/**
 * Have not added any API calls here,
 * simply use the form fields to render
 * input components for signing Authority Representative
 */

const sectionName = 'signing-authority';
const SigningAuthority = ({ formField }) => {
  const { signingAuthorityRepresentative } = formField;
  return (
    <>
      <h1 className="fw-600 h2" id={sectionName}>
        Signing Authority
      </h1>
      <p>
        Please Indicate the individual who has the signing authority for the
        agreement
      </p>

      <div className="row">
        {signingAuthorityRepresentative.map((el, index) => (
          <div key={index} className="col-md-12" id={el.name}>
            <Input
              name={el.name}
              labelName={el.label}
              placeholder={el.placeholder}
              requiredMark={true}
              ariaLabel={sectionName + ' ' + el.name}
            />
          </div>
        ))}
      </div>

      <CustomStepButton previousPage="/working-groups" nextPage="/review" />
    </>
  );
};

export default SigningAuthority;
