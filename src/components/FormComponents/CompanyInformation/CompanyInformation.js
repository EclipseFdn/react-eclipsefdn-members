import React, { useContext, useEffect, useState } from "react";
import MembershipContext from "../../../Context/MembershipContext";
import { matchCompanyFields, matchContactFields } from '../../../Utils/formFunctionHelpers';
import Company from './Company';
import Contacts from './Contacts';
import { validationSchema } from '../formModels/ValidationSchema';
import { Formik, Form } from 'formik';
import CustomStepButton from "../CustomStepButton";

const CompanyInformation = ({ formField, ...otherProps }) => {
  
  const {currentFormId} = useContext(MembershipContext);

  const [ initialValues, setInitialValues ] = useState({
    organization: {
      id: "",
      legalName: "",
      address: {
        street: "",
        city: "",
        provinceOrState: "",
        country: "",
        postalCode: ""
      },
      twitterHandle: "",
    },
  
    // Step1: Company Representative
    companyRepresentative: {
      mktSame: false,
      accSame: false,
      representative: {
        id: "",
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      },
  
      marketingRepresentative: {
        id: "",
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      },
  
      accounting: {
        id: "",
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      }
    }
  });

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId) {
      let pool = [fetch(`membership_data/${currentFormId}/organizations.json`,{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}), fetch(`membership_data/${currentFormId}/contacts.json`,{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})]
  
      Promise.all(pool)
        .then((res) => 
          Promise.all(res.map(r => r.json()))
        )
        .then(([organizations, contacts]) => {
          // Matching the field data
          if (organizations[0] && contacts.length) {
            let tempOrg = matchCompanyFields(organizations[0])
            let tempContacts = matchContactFields(contacts)
            setInitialValues({
                ...tempOrg,
              ...tempContacts
            })
          }
        })
    }
    // eslint-disable-next-line
  }, [])

  const handleOnSubmit = async (values, formikBag) => {
    console.log(values)
    otherProps.parentState.handleComplete()
    otherProps.parentState.setStep(s=> s+1)
  }

  // console.log(initialValues)

  return (
    <>
      <h2 className="fw-600">Company Information</h2>
      <p>Please complete your company information below. This should be the legal name and address of your organization. Committer members do not need to provide this information unless it differs from the information provided with their Individual Committer Agreement.</p>
      <div className="align-center">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema[0]}
          onSubmit={handleOnSubmit}
        >
          {
            (formik) => (
              <Form>
              <Company />
              <Contacts initialValues={initialValues} formField={formField} />
              <CustomStepButton
                step={otherProps.parentState.step}
                // isSubmitting={formik.isSubmitting}
                setStep={otherProps.parentState.setStep}
                isLastStep={otherProps.parentState.isLastStep}
                // formikSubmit={formik.submitForm}
              />
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  );
};

export default CompanyInformation
