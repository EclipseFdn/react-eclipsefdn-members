import React, { useState } from "react";
import { Formik, Form } from "formik";
import CustomStepButton from "./CustomStepButton";
import {validationSchema} from '../formModels/ValidationSchema';

const FormikStepper = ({ children, ...props }) => {
    const childrenArray = React.Children.toArray(children)
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    const currentValidationSchema = validationSchema[step];
  
    function isLastStep() {
      return step === childrenArray.length - 1
    }

    function isWorkingGroupStep() {
      return step === 2
    }

    const handleOnSubmit = async (values, helpers) => {
      if (isWorkingGroupStep() && values.workingGroup === "none") {
        console.log(values)
        setStep((s) => s + 1) // skip one step
      }
      if (isLastStep()) {
        await props.onSubmit(values)
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
        validationSchema={currentValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
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