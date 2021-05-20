import React from 'react';
import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formModels/formFieldModel';
import { Checkbox, FormControlLabel } from '@material-ui/core';

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
const Contacts = ({ formik }) => {
  // the boolean form value of "is marketing Rep. the same as company Rep.?"
  const isMarketingSameAsCompany =
    formik.values.representative.marketing.sameAsCompany;

  // the boolean form value of "is accounting Rep. the same as company Rep.?"
  const isAccountingSameAsCompany =
    formik.values.representative.accounting.sameAsCompany;
  const { company, marketing, accounting } = formField;

  /**
   * Generate Representatives Inputs components
   *
   * @param returns
   * @param representativeFields - company, marketing or accounting
   * @param prefix - simply to add it in the key prop, so that each component has a unique key
   * @param disableInput - if marketing / accounting is the same as company Rep., mark the input disabled and just used the same values from company Rep.
   */

  const generateMemberRepContacts = () => {
    // Using array.map to generate the Input will cause problem on Formik (useFormik) error and helpertext handler.
    // So, for now, write down all required input/textfield manually
    return (
      <>
        <div className="col-md-12" id={company.firstName.name}>
          <Input
            name={company.firstName.name}
            labelName={company.firstName.label}
            ariaLabel={'company-rep' + company.firstName.name}
            placeholder={company.firstName.placeholder}
            disableInput={false}
            requiredMark={true}
            value={formik.values.representative.company.firstName}
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.company?.firstName &&
              Boolean(formik.errors.representative?.company?.firstName)
            }
            helperText={
              formik.touched.representative?.company?.firstName &&
              formik.errors.representative?.company?.firstName
            }
          />
        </div>
        <div className="col-md-12" id={company.lastName.name}>
          <Input
            name={company.lastName.name}
            labelName={company.lastName.label}
            ariaLabel={'company-rep' + company.lastName.name}
            placeholder={company.lastName.placeholder}
            disableInput={false}
            requiredMark={true}
            value={formik.values.representative.company.lastName}
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.company?.lastName &&
              Boolean(formik.errors.representative?.company?.lastName)
            }
            helperText={
              formik.touched.representative?.company?.lastName &&
              formik.errors.representative?.company?.lastName
            }
          />
        </div>
        <div className="col-md-12" id={company.jobtitle.name}>
          <Input
            name={company.jobtitle.name}
            labelName={company.jobtitle.label}
            ariaLabel={'company-rep' + company.jobtitle.name}
            placeholder={company.jobtitle.placeholder}
            disableInput={false}
            requiredMark={true}
            value={formik.values.representative.company.jobtitle}
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.company?.jobtitle &&
              Boolean(formik.errors.representative?.company?.jobtitle)
            }
            helperText={
              formik.touched.representative?.company?.jobtitle &&
              formik.errors.representative?.company?.jobtitle
            }
          />
        </div>
        <div className="col-md-12" id={company.email.name}>
          <Input
            name={company.email.name}
            labelName={company.email.label}
            ariaLabel={'company-rep' + company.email.name}
            placeholder={company.email.placeholder}
            disableInput={false}
            requiredMark={true}
            value={formik.values.representative.company.email}
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.company?.email &&
              Boolean(formik.errors.representative?.company?.email)
            }
            helperText={
              formik.touched.representative?.company?.email &&
              formik.errors.representative?.company?.email
            }
          />
        </div>
      </>
    );
  };

  const generateMarketingRepContacts = () => {
    // Using array.map to generate the Input will cause problem on Formik (useFormik) error and helpertext handler.
    // So, for now, write down all required input/textfield manually
    return (
      <>
        <div className="col-md-12" id={marketing.firstName.name}>
          <Input
            name={marketing.firstName.name}
            labelName={marketing.firstName.label}
            ariaLabel={'marketing-rep' + marketing.firstName.name}
            placeholder={marketing.firstName.placeholder}
            disableInput={isMarketingSameAsCompany}
            requiredMark={true}
            value={
              isMarketingSameAsCompany
                ? formik.values.representative.company.firstName
                : formik.values.representative.marketing.firstName
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.marketing?.firstName &&
              Boolean(formik.errors.representative?.marketing?.firstName)
            }
            helperText={
              formik.touched.representative?.marketing?.firstName &&
              formik.errors.representative?.marketing?.firstName
            }
          />
        </div>

        <div className="col-md-12" id={marketing.lastName.name}>
          <Input
            name={marketing.lastName.name}
            labelName={marketing.lastName.label}
            ariaLabel={'marketing-rep' + marketing.lastName.name}
            placeholder={marketing.lastName.placeholder}
            disableInput={isMarketingSameAsCompany}
            requiredMark={true}
            value={
              isMarketingSameAsCompany
                ? formik.values.representative.company.lastName
                : formik.values.representative.marketing.lastName
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.marketing?.lastName &&
              Boolean(formik.errors.representative?.marketing?.lastName)
            }
            helperText={
              formik.touched.representative?.marketing?.lastName &&
              formik.errors.representative?.marketing?.lastName
            }
          />
        </div>

        <div className="col-md-12" id={marketing.jobtitle.name}>
          <Input
            name={marketing.jobtitle.name}
            labelName={marketing.jobtitle.label}
            ariaLabel={'marketing-rep' + marketing.jobtitle.name}
            placeholder={marketing.jobtitle.placeholder}
            disableInput={isMarketingSameAsCompany}
            requiredMark={true}
            value={
              isMarketingSameAsCompany
                ? formik.values.representative.company.jobtitle
                : formik.values.representative.marketing.jobtitle
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.marketing?.jobtitle &&
              Boolean(formik.errors.representative?.marketing?.jobtitle)
            }
            helperText={
              formik.touched.representative?.marketing?.jobtitle &&
              formik.errors.representative?.marketing?.jobtitle
            }
          />
        </div>

        <div className="col-md-12" id={marketing.email.name}>
          <Input
            name={marketing.email.name}
            labelName={marketing.email.label}
            ariaLabel={'marketing-rep' + marketing.email.name}
            placeholder={marketing.email.placeholder}
            requiredMark={true}
            value={
              isMarketingSameAsCompany
                ? formik.values.representative.company.email
                : formik.values.representative.marketing.email
            }
            disableInput={isMarketingSameAsCompany}
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.marketing?.email &&
              Boolean(formik.errors.representative?.marketing?.email)
            }
            helperText={
              formik.touched.representative?.marketing?.email &&
              formik.errors.representative?.marketing?.email
            }
          />
        </div>
      </>
    );
  };

  const generateAccountingRepContacts = () => {
    // Using array.map to generate the Input will cause problem on Formik (useFormik) error and helpertext handler.
    // So, for now, write down all required input/textfield manually
    return (
      <>
        <div className="col-md-12" id={accounting.firstName.name}>
          <Input
            name={accounting.firstName.name}
            labelName={accounting.firstName.label}
            ariaLabel={'accounting-rep' + accounting.firstName.name}
            placeholder={accounting.firstName.placeholder}
            disableInput={isAccountingSameAsCompany}
            requiredMark={true}
            value={
              isAccountingSameAsCompany
                ? formik.values.representative.company.firstName
                : formik.values.representative.accounting.firstName
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.accounting?.firstName &&
              Boolean(formik.errors.representative?.accounting?.firstName)
            }
            helperText={
              formik.touched.representative?.accounting?.firstName &&
              formik.errors.representative?.accounting?.firstName
            }
          />
        </div>
        <div className="col-md-12" id={accounting.lastName.name}>
          <Input
            name={accounting.lastName.name}
            labelName={accounting.lastName.label}
            ariaLabel={'accounting-rep' + accounting.lastName.name}
            placeholder={accounting.lastName.placeholder}
            disableInput={isAccountingSameAsCompany}
            requiredMark={true}
            value={
              isAccountingSameAsCompany
                ? formik.values.representative.company.lastName
                : formik.values.representative.accounting.lastName
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.accounting?.lastName &&
              Boolean(formik.errors.representative?.accounting?.lastName)
            }
            helperText={
              formik.touched.representative?.accounting?.lastName &&
              formik.errors.representative?.accounting?.lastName
            }
          />
        </div>
        <div className="col-md-12" id={accounting.jobtitle.name}>
          <Input
            name={accounting.jobtitle.name}
            labelName={accounting.jobtitle.label}
            ariaLabel={'accounting-rep' + accounting.jobtitle.name}
            placeholder={accounting.jobtitle.placeholder}
            disableInput={isAccountingSameAsCompany}
            requiredMark={true}
            value={
              isAccountingSameAsCompany
                ? formik.values.representative.company.jobtitle
                : formik.values.representative.accounting.jobtitle
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.accounting?.jobtitle &&
              Boolean(formik.errors.representative?.accounting?.jobtitle)
            }
            helperText={
              formik.touched.representative?.accounting?.jobtitle &&
              formik.errors.representative?.accounting?.jobtitle
            }
          />
        </div>
        <div className="col-md-12" id={accounting.email.name}>
          <Input
            name={accounting.email.name}
            labelName={accounting.email.label}
            ariaLabel={'accounting-rep' + accounting.email.name}
            placeholder={accounting.email.placeholder}
            disableInput={isAccountingSameAsCompany}
            requiredMark={true}
            value={
              isAccountingSameAsCompany
                ? formik.values.representative.company.email
                : formik.values.representative.accounting.email
            }
            onChange={formik.handleChange}
            error={
              formik.touched.representative?.accounting?.email &&
              Boolean(formik.errors.representative?.accounting?.email)
            }
            helperText={
              formik.touched.representative?.accounting?.email &&
              formik.errors.representative?.accounting?.email
            }
          />
        </div>
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
      <div className="row">{generateMemberRepContacts()}</div>

      <h4 className="fw-600" id="marketing-rep">
        Company Marketing Representative
      </h4>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.marketing.sameAsCompany"
            color="primary"
            checked={formik.values.representative.marketing.sameAsCompany}
            onChange={formik.handleChange}
          />
        }
        label="Same as member rep."
      />
      <div className="row">{generateMarketingRepContacts()}</div>

      <h4 className="fw-600" id="accounting-rep">
        Company Accounting Representative
      </h4>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.accounting.sameAsCompany"
            color="primary"
            checked={isAccountingSameAsCompany}
            onChange={formik.handleChange}
          />
        }
        label="Same as member rep."
      />
      <div className="row">{generateAccountingRepContacts()}</div>
    </>
  );
};

export default Contacts;
