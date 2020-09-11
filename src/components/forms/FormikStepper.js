import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomStepButton from "./CustomStepButton"
import { Step, StepLabel, Stepper } from '@material-ui/core';

const FormikStepper = ({ children, ...props }) => {
    const childrenArray = React.Children.toArray(children)
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false)
  
    function isLastStep() {
      return step === childrenArray.length - 1
    }
  
    return (
      <Formik
        {...props}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values)
            setCompleted(true)
          } else {
            localStorage.setItem('userData', JSON.stringify(values))
            props.setFormDataStates(values)
            setStep((s) => s + 1)
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={child.props.label} completed={step > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
  
            {currentChild}
  
            <CustomStepButton
              step={step}
              isSubmitting={isSubmitting}
              setStep={setStep}
              isLastStep={isLastStep}
            />
            {/* {step > 0 ? (
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
            ) : null}
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
                // onClick={()=>console.log(values)}
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button> */}
          </Form>
        )}
      </Formik>
    );
  }

export default FormikStepper