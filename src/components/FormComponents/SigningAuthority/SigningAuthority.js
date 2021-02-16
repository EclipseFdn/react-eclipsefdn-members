import React, { useState } from "react";
import Input from '../Inputs/Input';
import { Formik, Form } from 'formik';
import { validationSchema } from '../formModels/ValidationSchema';
import CustomStepButton from "../CustomStepButton";

const SigningAuthority = ({ formField, ...otherProps }) => {
  const {
    signingAuthorityRepresentative
    } = formField;

  // eslint-disable-next-line
  const [ initialValues, setInitialValues ] = useState({
    signingAuthorityRepresentative: {
      firstName: "",
      lastName: "",
      email: "",
      id: ""
    }
  })

  const handleOnSubmit = async (values, formikBag) => {
    console.log(values)
    otherProps.parentState.handleComplete()
    otherProps.parentState.setStep(s=> s+1)
  }

  return (
    <>
    <h2 className="fw-600">Signing Authority</h2>
    <p>Please Indicate the individual who has the signing authority for the agreement</p>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[3]}
      onSubmit={handleOnSubmit}
    >
      {
        (formik) => (
          <Form>
            <div className="row">
              <div className="col-md-12">
                  <Input name={signingAuthorityRepresentative[0].name} labelName={signingAuthorityRepresentative[0].label} placeholder={signingAuthorityRepresentative[0].placeholder} />
              </div>
              <div className="col-md-12">
                  <Input name={signingAuthorityRepresentative[1].name} labelName={signingAuthorityRepresentative[1].label} placeholder={signingAuthorityRepresentative[1].placeholder} />
              </div>
              <div className="col-md-24">
                  <Input name={signingAuthorityRepresentative[2].name} labelName={signingAuthorityRepresentative[2].label} placeholder={signingAuthorityRepresentative[2].placeholder} />
              </div>
            </div>
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
    </>
  )

}

export default SigningAuthority