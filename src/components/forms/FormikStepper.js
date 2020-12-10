import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomStepButton from "./CustomStepButton";
// import { validationSchema } from '../formModels/ValidationSchema';
import Stepper from "../steppers/Stepper";
import Step from "../steppers/Step";

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]
  // const currentValidationSchema = validationSchema[step]

  const [completed, setCompleted] = useState(new Set())
  const [skipped] = useState(new Set())

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const handleComplete = () => {
    const newCompleted = new Set(completed)
    newCompleted.add(step)
    setCompleted(newCompleted)
  }

  const handleOnSubmit = async (values, helpers, action) => {

    if (isLastStep()) {
      await props.onSubmit(values)
    } 
    else {
      props.setFormDataStates(values)
      handleComplete()
      // actions.setStatus({message: "submitted"})
      setStep((s) => s + 1)
    }
  }

  ///////////////////////////////////
  function isStepComplete(step) {
    return completed.has(step)
  }
  const isStepSkipped = (step) => {
    return skipped.has(step)
  }
  ////////////////////////////////////////

  const checkIcon = () => (
    <i className="fa fa-check" aria-hidden="true"></i>
  )

  return (
    <>
    <Stepper activeStep={step} chidlrenSteps={childrenArray} handleOnClick={setStep} checkIcon={checkIcon()}>
    {childrenArray.map((child, index) => {
      const stepProps = {}
      if (isStepSkipped(index-1)) {
        stepProps.completed = true
      }

      return (
        <Step key={index} width={100 / childrenArray.length} title={child.props.label} onClick={setStep} active={index === step} completed={isStepComplete(index) || child.props.skipped || stepProps.completed} first={index === 0} isLast={index === childrenArray.length - 1} index={index} checkIcon={checkIcon()} />
      )
    })}
    </Stepper>
    <Formik
      {...props}
      onSubmit={handleOnSubmit}
      // validationSchema={currentValidationSchema}
    >
      {
      
        (formik) => {
        return (
          <Form>
            {currentChild}
            <CustomStepButton
              values={formik.values}
              step={step}
              isSubmitting={formik.isSubmitting}
              setStep={setStep}
              isLastStep={isLastStep}
            />
          </Form>
        )
        }
      
      }
    </Formik>
    </>
  )
}

export default FormikStepper