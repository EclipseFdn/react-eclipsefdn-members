import React, { useContext } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import StatesSelect from "./Inputs/CustomSelect/StatesSelect";
import CountrySelect from "./Inputs/CustomSelect/CountrySelect";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';

const CompanyInformation = ({ formField, label, skipped, addMKTRepre, setAddMKTRepre, addACCRepre, setAddACCRepre, disableInput, setDisableInput }) => {

  const { companyRepresentative, marketingRepresentative, accounting } = formField

  const { isExistingMember, organiazationData } = useContext(MembershipContext)

  const toggleMKTRepreContacts = () => {

    setAddMKTRepre(!addMKTRepre)
  }

  const toggleACCRepreContacts = () => {
    setAddACCRepre(!addACCRepre)
  }

  return (
    <>
      <h2 className="fw-600">Company Information</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <div>
      <h4 className="fw-600"> Organization * </h4>
      <CustomSelectWrapper
        name="organization.legalName"
        srcData="companies"
        isExistingMember={isExistingMember}
        setDisableInput={setDisableInput}
        organiazationData={organiazationData}
        renderComponent={CustomAsyncSelect}
      />
      <Input name="organization.twitterHandle" labelName="Twitter" placeholder="Twitter" disableInput={disableInput} />

      <h4 className="fw-600">Address</h4>
      <Input name="organization.address.street" labelName="Street" placeholder="Street" disableInput={disableInput} />
      <Input name="organization.address.city" labelName="City" placeholder="City" disableInput={disableInput} />

      {
        disableInput ? 
        <>
          <Input name="organization.address.provinceOrState" labelName="Province Or State" placeholder="province Or State" disableInput={disableInput} />
          <Input name="organization.address.country" labelName="Country" placeholder="Country" disableInput={disableInput} />
        </>
        : 
        <>
          <label htmlFor="organization.address.provinceOrState">Province / State</label>
          <CustomSelectWrapper
            name="organization.address.provinceOrState"
            srcData="provinceOrState"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={StatesSelect}
          />
          <label htmlFor="organization.address.country">Country</label>
          <CustomSelectWrapper
            name="organization.address.country"
            srcData="country"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={CountrySelect}
          />        
        </>
      }
      <Input name="organization.address.postalCode" labelName="Postal Code" placeholder="Postal Code" disableInput={disableInput} />

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

      </div>
    </>
  );
};

export default CompanyInformation
