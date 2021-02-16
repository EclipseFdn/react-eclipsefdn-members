import React, { useContext, useEffect, useState } from "react";
import Select from '../Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';
import MembershipContext from "../../../Context/MembershipContext";
import { validationSchema } from '../formModels/ValidationSchema';
import { Formik, Form } from 'formik';
import CustomStepButton from "../CustomStepButton";

const MembershipLevel = ({ formField, ...otherProps }) => {

  const { currentFormId } = useContext(MembershipContext);
  const [ initialValues, setInitialValues ] = useState({membershipLevel: ""});

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId) {
      fetch(`membership_data/${currentFormId}/membership.json`,{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then(resp => resp.json())
      .then(data => {
        if(data) {
          setInitialValues({membershipLevel: data.membership_level})
        }
      })
    }

    // eslint-disable-next-line
  }, [])

  const dropdownOptions = [
    { name: 'Select a level', value: '' },
    { name: 'Strategic Members', value: 'strategic' },
    { name: 'Contributing Members (formerly referred to as Solutions Members)', value: 'contributing' },
    { name: 'Associate Members', value: 'associate' },
    { name: 'Committer Members', value: 'committer' }
  ]

  const handleOnSubmit = async (values, formikBag) => {
    console.log(values)
    otherProps.parentState.handleComplete()
    otherProps.parentState.setStep(s=> s+1)
  }

  return (
    <>
    <div className="align-center">
      <h2 className="fw-600">Membership Level</h2>
      <p>Please Indicate the class of membership for which you are applying</p>
      <h3 className="fw-600">What is your intended Membership Level?</h3>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema[1]}
        onSubmit={handleOnSubmit}
      >
      {
        (formik) => (
          <Form>
            <Select
              label="membershipLevel"
              name="membershipLevel"
              options={dropdownOptions}
            />
            <MembershipFeeTable />
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

export default MembershipLevel
