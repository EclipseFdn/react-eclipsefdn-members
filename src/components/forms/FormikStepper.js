import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomStepButton from "./CustomStepButton";
import * as Yup from "yup";
// import Stepper from 'react-stepper-horizontal';
// import { Step, StepLabel, Stepper } from '@material-ui/core';

const FormikStepper = ({ children, ...props }) => {
    const childrenArray = React.Children.toArray(children)
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false)
  
    function isLastStep() {
      return step === childrenArray.length - 1
    }

    function isWorkingGroupStep() {
      return step === 2
    }

    const validationSchema = Yup.object({
      organizationName: Yup.string().required('Required'),
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      provinceOrState: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      // birthDate: Yup.date()
      //   .required('Required')
      //   .nullable()
    })
  
    // const steps = [
    //   { 
    //     id: 0,
    //     title: "Company Information",
    //     onClick: (e) => {
    //       setStep(0)
    //     }
    //   },
    //   { 
    //     id: 1,
    //     title: "Membership",
    //     onClick: (e) => {
    //       setStep(1)
    //     }
    //   },
    //   { 
    //     id: 2,
    //     title: "Working Groups",
    //     onClick: (e) => {
    //       setStep(2)
    //     }
    //   },
    //   { 
    //     id: 3,
    //     title: "Participation",
    //     onClick: (e) => {
    //       setStep(3)
    //     }
    //   },
    // ]

    const handleOnSubmit = async (values, helpers) => {
      if (isWorkingGroupStep() && values.workingGroup === "none") {
        console.log(values)
        setStep((s) => s + 1) // skip one step
      }
      if (isLastStep()) {
        await props.onSubmit(values)
        setCompleted(true)
      } 
      else {
        props.setFormDataStates(values)
        setStep((s) => s + 1)
      }
    }

    return (
      <Formik
        {...props}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            {/* <Stepper steps={steps} activeStep={step}> */}
              {/* {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))} */}
            {/* </Stepper> */}
  
            {currentChild}
  
            <CustomStepButton
              values={values}
              step={step}
              isSubmitting={isSubmitting}
              setStep={setStep}
              isLastStep={isLastStep}
            />
          </Form>
        )}
      </Formik>
    );
  }

export default FormikStepper