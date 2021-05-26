import React from 'react';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';
/**
 * Have not added any API calls here,
 * simply use the form fields to render
 * input components for signing Authority Representative
 */

const sectionName = 'signing-authority';
const SigningAuthority = ({ formik }) => {
  const { signingAuthorityRepresentative } = formField;
  console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="fw-600 h2" id={sectionName}>
        Signing Authority
      </h1>
      <p>
        Please Indicate the individual who has the signing authority for the
        agreement
      </p>

      <div className="row">
        {
          // Using array.map to generate the Input will cause problem on Formik (useFormik) error handler and helpertext handler.
          // So, for now, write down all required input/textfield manually
        }
        <div
          className="col-md-12"
          id={signingAuthorityRepresentative.firstName.name}
        >
          <Input
            name={signingAuthorityRepresentative.firstName.name}
            labelName={signingAuthorityRepresentative.firstName.label}
            ariaLabel={
              sectionName + signingAuthorityRepresentative.firstName.name
            }
            placeholder={signingAuthorityRepresentative.firstName.placeholder}
            requiredMark={true}
            value={formik.values.signingAuthorityRepresentative.firstName}
            onChange={formik.handleChange}
          />
        </div>

        <div
          className="col-md-12"
          id={signingAuthorityRepresentative.lastName.name}
        >
          <Input
            name={signingAuthorityRepresentative.lastName.name}
            labelName={signingAuthorityRepresentative.lastName.label}
            ariaLabel={
              sectionName + signingAuthorityRepresentative.lastName.name
            }
            placeholder={signingAuthorityRepresentative.lastName.placeholder}
            requiredMark={true}
            value={formik.values.signingAuthorityRepresentative.lastName}
            onChange={formik.handleChange}
          />
        </div>

        <div
          className="col-md-12"
          id={signingAuthorityRepresentative.jobtitle.name}
        >
          <Input
            name={signingAuthorityRepresentative.jobtitle.name}
            labelName={signingAuthorityRepresentative.jobtitle.label}
            ariaLabel={
              sectionName + signingAuthorityRepresentative.jobtitle.name
            }
            placeholder={signingAuthorityRepresentative.jobtitle.placeholder}
            requiredMark={true}
            value={formik.values.signingAuthorityRepresentative.jobtitle}
            onChange={formik.handleChange}
          />
        </div>

        <div
          className="col-md-12"
          id={signingAuthorityRepresentative.email.name}
        >
          <Input
            name={signingAuthorityRepresentative.email.name}
            labelName={signingAuthorityRepresentative.email.label}
            ariaLabel={sectionName + signingAuthorityRepresentative.email.name}
            placeholder={signingAuthorityRepresentative.email.placeholder}
            requiredMark={true}
            value={formik.values.signingAuthorityRepresentative.email}
            onChange={formik.handleChange}
            error={
              formik.touched.signingAuthorityRepresentative?.email &&
              Boolean(formik.errors.signingAuthorityRepresentative?.email)
            }
            helperText={
              formik.touched.signingAuthorityRepresentative?.email &&
              formik.errors.signingAuthorityRepresentative?.email
            }
          />
        </div>
      </div>

      <CustomStepButton
        previousPage="/working-groups"
        nextPage="/review"
        pageIndex={4}
      />
    </form>
  );
};

export default SigningAuthority;
