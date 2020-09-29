import React from "react";
import Input from './Inputs/Input';

const CompanyInformation = ({ formField }) => {

  const {
    organizationName,
    street,
    city,
    provinceOrState,
    country,
    postalCode,
    twitterHandle,
    representativeFirstName,
    representativeLastName,
    representativeEmail
  } = formField;

  return (
    
    <>
      <h3>Confirm/Complete your Company’s Information</h3>
      <hr />
      <Input name={organizationName.name} labelName={organizationName.label} placeholder={organizationName.placeholder} />

      <hr />
      <h5>Address</h5>
      <Input name={street.name} labelName={street.label} placeholder={street.placeholder} />
      <Input name={city.name} labelName={city.label} placeholder={city.placeholder} />
      <Input name={provinceOrState.name} labelName={provinceOrState.label} placeholder={provinceOrState.placeholder} />
      <Input name={country.name} labelName={country.label} placeholder={country.placeholder} />
      <Input name={postalCode.name} labelName={postalCode.label} placeholder={postalCode.placeholder} />
      <Input name={twitterHandle.name} labelName={twitterHandle.label} placeholder={twitterHandle.placeholder} />

      <hr />
      <h5>Company Representative, Marketing Representative, Accounting Contact</h5>
      <Input name={representativeFirstName.name} labelName={representativeFirstName.label} placeholder={representativeFirstName.placeholder} />
      <Input name={representativeLastName.name} labelName={representativeLastName.label} placeholder={representativeLastName.placeholder} />
      <Input name={representativeEmail.name} labelName={representativeEmail.label} placeholder={representativeEmail.placeholder} />
    </>
  );
};

export default CompanyInformation
