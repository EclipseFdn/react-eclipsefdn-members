import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
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
  const { companyRep } = formField;

  /**
   * Generate Representatives Inputs components
   *
   * @param returns
   * @param representativeFields - company, marketing or accounting
   * @param prefix - simply to add it in the key prop, so that each component has a unique key
   * @param disableInput - if marketing / accounting is the same as company Rep., mark the input disabled and just used the same values from company Rep.
   */

  const handleCheckboxChange = (isChecked, fieldName) => {
    const repInfo = isChecked
      ? formik.values.representative.member
      : formik.values.representative[fieldName];

    const newValues = {
      ...repInfo,
      sameAsCompany: isChecked,
    };
    formik.setFieldValue(`representative.${fieldName}`, newValues);
  };

  const handleMemberInputChange = (value, name) => {
    const memberRepInfo = {
      ...formik.values.representative.member,
      [name]: value,
    };
    formik.setFieldValue('representative.member', memberRepInfo);

    // update representative.marketing values based on related checkbox
    if (isMarketingSameAsCompany) {
      const newValues = {
        ...memberRepInfo,
        id: formik.values.representative.marketing.id || '',
        sameAsCompany: isMarketingSameAsCompany,
      };
      formik.setFieldValue('representative.marketing', newValues);
    }

    // update representative.accounting values based on related checkbox
    if (isAccountingSameAsCompany) {
      const newValues = {
        ...memberRepInfo,
        id: formik.values.representative.accounting.id || '',
        sameAsCompany: isAccountingSameAsCompany,
      };
      formik.setFieldValue('representative.accounting', newValues);
    }
  };

  const generateContacts = (
    representativeFields,
    prefix,
    type,
    disableInput
  ) => (
    <>
      {representativeFields.map((el, index) => (
        <div key={prefix + index} className="col-md-12">
          <Input
            name={`representative.${type}.${el.name}`}
            labelName={el.label}
            ariaLabel={prefix + el.name}
            placeholder={el.placeholder}
            requiredMark={true}
            disableInput={disableInput}
            onChange={
              type === 'member'
                ? (ev) => handleMemberInputChange(ev.target.value, el.name)
                : formik.handleChange
            }
            value={formik.values.representative?.[type]?.[el.name]}
            error={
              formik.touched.representative?.[type]?.[el.name] &&
              Boolean(formik.errors.representative?.[type]?.[el.name])
            }
            helperText={
              formik.touched.representative?.[type]?.[el.name] &&
              formik.errors.representative?.[type]?.[el.name]
            }
          />
        </div>
      ))}
    </>
  );

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
        {generateContacts(companyRep, 'company-rep', 'member', false)}
      </div>

      <h4 className="fw-600" id="marketing-rep">
        Company Marketing Representative
      </h4>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.marketing.sameAsCompany"
            color="primary"
            checked={formik.values.representative.marketing.sameAsCompany}
            onChange={(ev) =>
              handleCheckboxChange(ev.target.checked, 'marketing')
            }
          />
        }
        label="Same as member rep."
      />

      <div className="row">
        {generateContacts(
          companyRep,
          'marketing-rep',
          'marketing',
          isMarketingSameAsCompany
        )}
      </div>

      <h4 className="fw-600" id="accounting-rep">
        Company Accounting Representative
      </h4>
      <FormControlLabel
        control={
          <Checkbox
            name="representative.accounting.sameAsCompany"
            color="primary"
            checked={isAccountingSameAsCompany}
            onChange={(ev) =>
              handleCheckboxChange(ev.target.checked, 'accounting')
            }
          />
        }
        label="Same as member rep."
      />

      <div className="row margin-bottom-40">
        {generateContacts(
          companyRep,
          'accounting-rep',
          'accounting',
          isAccountingSameAsCompany
        )}
      </div>
    </>
  );
};

export default Contacts;