import React, { useContext, useState } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelect";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';
import { mapField } from '../formModels/formFieldModel';

const CompanyInformation = ({ formField, label, skipped, addMKTRepre, setAddMKTRepre, addACCRepre, setAddACCRepre, ...props }) => {

  const { organization, companyRepresentative } = formField

  const {isExistingMember} = useContext(MembershipContext)

  const [disableInput, setDisableInput] = useState(false)

  const toggleMKTRepreContacts = () => {

    setAddMKTRepre(!addMKTRepre)
  }

  const toggleACCRepreContacts = () => {
    setAddACCRepre(!addACCRepre)
  }

  return (
    <>
      <h3>Confirm/Complete your Company’s Information</h3>
      <hr />
      <h4> Organizations </h4>
      <CustomSelectWrapper
        name="organization.legalName"
        srcData="companies"
        isExistingMember={isExistingMember}
        setDisableInput={setDisableInput}
        {...props}
      />
      <hr />
      <h5>Address</h5>
      { mapField(organization.address).map(el => <Input name={`organization.address.${el}`} labelName={el} placeholder={el} key={el} disableInput={disableInput} />) }
      <Input name="organization.twitterHandle" labelName="twitterHandle" placeholder="twitterHandle" disableInput={disableInput} />

      <hr />
      <h4>Company Representative Contact</h4>
      { mapField(companyRepresentative.representative).map(el => <Input name={`companyRepresentative.representative.${el}`} labelName={el} placeholder={el} key={`representative-${el}`} />) }

      <button type="button" className="btn btn-secondary margin-top-10 margin-right-10" onClick={toggleMKTRepreContacts}>
        { addMKTRepre ? "Remove Marketing Representative" : "Add Marketing Representative"}
      </button>

      <button type="button" className="btn btn-secondary margin-top-10" onClick={toggleACCRepreContacts}>
        { addACCRepre ? "Remove Accounting Representative" : "Add Accounting Representative"}
      </button>

      { addMKTRepre &&
        <>
          <hr />
          <h4>Marketing Representative Contact</h4>
          { mapField(companyRepresentative.marketingRepresentative).map(el => <Input name={`companyRepresentative.marketingRepresentative.${el}`} labelName={el} placeholder={el} key={`marketingRepresentative-${el}`} />) }
        </>
      }

      { addACCRepre &&
        <>
          <hr />
          <h4>Accounting Representative Contact</h4>
          { mapField(companyRepresentative.accounting).map(el => <Input name={`companyRepresentative.accounting.${el}`} labelName={el} placeholder={el} key={`accounting-${el}`} />) }
        </>
      }

    </>
  );
};

export default CompanyInformation
