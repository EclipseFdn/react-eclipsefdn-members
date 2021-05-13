import React from 'react';
import Input from '../../UIComponents/Inputs/Input';
import CustomCheckbox from '../../UIComponents/Inputs/CustomCheckbox';

/**
 * - 

 * **/

/**
 * Render three representatives inputs, include checkbox
 *
 * Props:
 *  - formValues: current form values; passed from
 *      CompanyInformation component;
 *  - formField: the form field in formModels/formFieldModel.js
 *
 * @returns
 */
const Contacts = ({ formValues, formField }) => {
  // the boolean form value of "is marketing Rep. the same as company Rep.?"
  const mktSame = formValues.representative.marketing.sameAsCompany;
  // the boolean form value of "is accounting Rep. the same as company Rep.?"
  const accSame = formValues.representative.accounting.sameAsCompany;
  const { company, marketing, accounting } = formField;

  /**
   * Generate Representatives Inputs components
   *
   * @param returns
   * @param representativeFields - company, marketing or accounting
   * @param prefix - simply to add it in the key prop, so that each component has a unique key
   * @param disableInput - if marketing / accounting is the same as company Rep., mark the input disabled and just used the same values from company Rep.
   */
  const generateContacts = (representativeFields, prefix, disableInput) => {
    return (
      <>
        {representativeFields.map((el, index) => (
          <div key={prefix + index} className="col-md-12" id={el.name}>
            <Input
              name={el.name}
              labelName={el.label}
              ariaLabel={prefix + ' ' + el.name}
              placeholder={el.placeholder}
              disableInput={disableInput}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <h4 className="fw-600" id="company-rep">
        Company Member Representative
        <span className="orange-star margin-left-5">*</span>
      </h4>
      <p>
        Please indicate the primary point of contact between your organization
        and the Eclipse Foundation. As per the Eclipse Bylaws, the Member
        Representative shall represent your organization in the General
        Assembly, have the right to cast any votes on behalf of your
        organization, and shall have the authority to update information
        provided to Eclipse Foundation.
      </p>
      <p>
        All formal communications from the Eclipse Foundation will be sent to
        the Member Representative.
      </p>
      <div className="row">
        {generateContacts(company, 'company-rep', false)}
      </div>

      <h4 className="fw-600" id="marketing-rep">
        Company Marketing Representative
      </h4>
      <CustomCheckbox
        name="representative.marketing.sameAsCompany"
        label="Same as member rep."
      />
      <div className="row">
        {mktSame && generateContacts(company, 'marketing-rep', mktSame)}
        {!mktSame && generateContacts(marketing, 'marketing-rep', mktSame)}
      </div>

      <h4 className="fw-600" id="accounting-rep">
        Company Accounting Representative
      </h4>
      <CustomCheckbox
        name="representative.accounting.sameAsCompany"
        label="Same as member rep."
      />
      <div className="row">
        {accSame && generateContacts(company, 'accounting-rep', accSame)}
        {!accSame && generateContacts(accounting, 'accounting-rep', accSame)}
      </div>
    </>
  );
};

export default Contacts;
