import React, { useContext, useState } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelectWrapper";
import MembershipContext from "../MembershipContext";
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
    companyRepresentativeFirstName,
    companyRepresentativeLastName,
    companyRepresentativeEmail,
    marketingRepresentativeFirstName,
    marketingRepresentativeLastName,
    marketingRepresentativeEmail,
    accountingRepresentativeFirstName,
    accountingRepresentativeLastName,
    accountingRepresentativeEmail,
  } = formField;

  const {isExistingMember} = useContext(MembershipContext)

  const [disableInput, setDisableInput] = useState(false)

  return (
    
    <>

      <h3>Confirm/Complete your Company’s Information</h3>
      <hr />

      <p> test aync organizations </p>
      <CustomSelectWrapper name={organizationName.name} srcData="companies" isExistingMember={isExistingMember} setDisableInput={setDisableInput} />

      {/* <Input name={organizationName.name} labelName={organizationName.label} placeholder={organizationName.placeholder} /> */}

      <hr />
      <h5>Address</h5>
      <Input name={street.name} labelName={street.label} placeholder={street.placeholder} disableInput={disableInput} />
      <Input name={city.name} labelName={city.label} placeholder={city.placeholder} disableInput={disableInput} />
      <Input name={provinceOrState.name} labelName={provinceOrState.label} placeholder={provinceOrState.placeholder} disableInput={disableInput} />
      <Input name={country.name} labelName={country.label} placeholder={country.placeholder} disableInput={disableInput} />
      <Input name={postalCode.name} labelName={postalCode.label} placeholder={postalCode.placeholder} disableInput={disableInput} />
      <Input name={twitterHandle.name} labelName={twitterHandle.label} placeholder={twitterHandle.placeholder} disableInput={disableInput} />

      <hr />
      <h4>Company Representative Contact</h4>
      <Input name={companyRepresentativeFirstName.name} labelName={companyRepresentativeFirstName.label} placeholder={companyRepresentativeFirstName.placeholder} />
      <Input name={companyRepresentativeLastName.name} labelName={companyRepresentativeLastName.label} placeholder={companyRepresentativeLastName.placeholder} />
      <Input name={companyRepresentativeEmail.name} labelName={companyRepresentativeEmail.label} placeholder={companyRepresentativeEmail.placeholder} />

      <hr />
      <h4>Marketing Representative Contact</h4>
      <Input name={marketingRepresentativeFirstName.name} labelName={marketingRepresentativeFirstName.label} placeholder={marketingRepresentativeFirstName.placeholder} />
      <Input name={marketingRepresentativeLastName.name} labelName={marketingRepresentativeLastName.label} placeholder={marketingRepresentativeLastName.placeholder} />
      <Input name={marketingRepresentativeEmail.name} labelName={marketingRepresentativeEmail.label} placeholder={marketingRepresentativeEmail.placeholder} />

      <hr />
      <h4>Accounting Contact</h4>
      <Input name={accountingRepresentativeFirstName.name} labelName={accountingRepresentativeFirstName.label} placeholder={accountingRepresentativeFirstName.placeholder} />
      <Input name={accountingRepresentativeLastName.name} labelName={accountingRepresentativeLastName.label} placeholder={accountingRepresentativeLastName.placeholder} />
      <Input name={accountingRepresentativeEmail.name} labelName={accountingRepresentativeEmail.label} placeholder={accountingRepresentativeEmail.placeholder} />
    </>
  );
};

export default CompanyInformation
