import React, { useContext } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelect";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';

const CompanyInformation = ({ formField, label, skipped, addMKTRepre, setAddMKTRepre, addACCRepre, setAddACCRepre, disableInput, setDisableInput }) => {

  const { organizationAddress, companyRepresentative, marketingRepresentative, accounting } = formField

  const {isExistingMember} = useContext(MembershipContext)

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
      />
      <hr />
      <h5>Address</h5>
      { organizationAddress.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} disableInput={disableInput} />) }
      <Input name="organization.twitterHandle" labelName="Twitter" placeholder="Twitter" disableInput={disableInput} />

      <hr />
      <h4>Company Representative Contact</h4>
      { companyRepresentative.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} />) }

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
          { marketingRepresentative.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} />) }
        </>
      }

      { addACCRepre &&
        <>
          <hr />
          <h4>Accounting Representative Contact</h4>
          { accounting.map(el => <Input name={el.name} labelName={el.label} placeholder={el.placeholder} key={el.name} />) }
        </>
      }

    </>
  );
};

export default CompanyInformation
