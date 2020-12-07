import React, { useContext, useState } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelectWrapper";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';
import { mapField } from '../formModels/formFieldModel';

const CompanyInformation = ({ formField }) => {

  const {
    organization,
    companyRepresentative,
  } = formField;

  const {isExistingMember} = useContext(MembershipContext)

  const [disableInput, setDisableInput] = useState(false)

  return (
    <>
      <h3>Confirm/Complete your Company’s Information</h3>
      <hr />
      <h4> Organizations </h4>
      <CustomSelectWrapper name="organization.legalName" srcData="companies" isExistingMember={isExistingMember} setDisableInput={setDisableInput} />
      <hr />
      <h5>Address</h5>
      { mapField(organization.address).map(el => <Input name={`organization.address.${el}`} labelName={el} placeholder={el} key={el} disableInput={disableInput} />) }
      <Input name="organization.twitterHandle" labelName="twitterHandle" placeholder="twitterHandle" disableInput={disableInput} />

      <hr />
      <h4>Company Representative Contact</h4>
      { mapField(companyRepresentative.representative).map(el => <Input name={`companyRepresentative.representative.${el}`} labelName={el} placeholder={el} key={el} />) }

      <hr />
      <h4>Marketing Representative Contact</h4>


      <hr />
      <h4>Accounting Contact</h4>

    </>
  );
};

export default CompanyInformation
