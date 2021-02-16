import React from "react";
import Input from '../Inputs/Input';
import CustomCheckbox from '../Inputs/CustomCheckbox';

const Contacts = ({initialValues, formField}) => {

  const mktSame = initialValues.companyRepresentative.mktSame;
  const accSame = initialValues.companyRepresentative.accSame;

  const { companyRepresentative, marketingRepresentative, accounting } = formField;
  
  const generateContacts = (representatives, prefix, disableInput) => {
    return (
      <>
        { representatives.map((el, index) => 
          <div key={prefix + index} className="col-md-12">
            <Input name={el.name} labelName={el.label} placeholder={el.placeholder} disableInput={disableInput} />
          </div>
        ) }
      </>
    )
  }

  return (
  <>
    <h4 className="fw-600">Company Representative Contact</h4>
    <p>Please indicate the primary point of contact between your organization and the Eclipse Foundation. As per the Eclipse Bylaws, the Member Representative shall represent your organization in the General Assembly, have the right to cast any votes on behalf of your organization, and shall have the authority to update information provided to Eclipse Foundation.</p>
    <p>All formal communications from the Eclipse Foundation will be sent to the Member Representative.</p>
    <div className="row">
      { generateContacts(companyRepresentative, 'companyRepresentative-', false) }
    </div>

    <h4 className="fw-600">Company Marketing Representative</h4>
    <CustomCheckbox name="companyRepresentative.marketingRepresentative.sameAsCompany" label="Same as company Rep." />
    <div className="row">
      { mktSame && generateContacts(companyRepresentative, 'marketingRepresentative-', mktSame) }
      { !mktSame && generateContacts(marketingRepresentative, 'marketingRepresentative-', mktSame) }
    </div>

    <h4 className="fw-600">Company Accounting Representative</h4>
    <CustomCheckbox name="companyRepresentative.accounting.sameAsCompany" label="Same as company Rep." />
    <div className="row">
      { accSame && generateContacts(companyRepresentative, 'accounting-', accSame) }
      { !accSame && generateContacts(accounting, 'accounting-', accSame) }
    </div>
  </>
  )
}

export default Contacts