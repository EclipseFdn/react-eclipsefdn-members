import React, { useState, useContext } from "react";
// import { Form, Formik } from "formik";
// import { validationSchema } from '../formModels/ValidationSchema';
import StepperComponent from "../../Steppers/StepperComponent";
// import CustomStepButton from "../CustomStepButton";
// import { executeSendDataByStep, assignContactData } from '../../../Utils/formFunctionHelpers';
import MembershipContext from "../../../Context/MembershipContext";
import SubmitSuccess from '../SubmitSuccess';

//form.validateForm(); to manually call validate

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const [completed, setCompleted] = useState(new Set());
  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]
  // const currentValidationSchema = validationSchema[step]

  const { currentFormId, setCurrentFormId } = useContext(MembershipContext);
  // const { currentUser } = useContext(MembershipContext);

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const handleComplete = () => {
      const newCompleted = new Set(completed)
      newCompleted.add(step)
      setCompleted(newCompleted)
    }

  // const defaultBehaviour = () => {
  //   handleComplete();
  //   setStep((s) => s + 1);
  // }

  // const handleOnSubmit = async (values, formikBag) => {

  //   switch(step) {
  //     case childrenArray.length - 1:
  //       console.log("submit on last step");
  //       console.log(values);
  //       defaultBehaviour();
  //       break;

  //     case 0: 
  //       if(values.companyRepresentative.marketingRepresentative.sameAsCompany) {
  //         assignContactData(values.companyRepresentative.marketingRepresentative, values.companyRepresentative.representative)
  //       }
  //       if (values.companyRepresentative.accounting.sameAsCompany) {
  //         assignContactData(values.companyRepresentative.accounting, values.companyRepresentative.representative)
  //       }
  //       await executeSendDataByStep(step, values, currentFormId, currentUser.user_id);
  //       defaultBehaviour();
  //       break;

  //     default:
  //       await executeSendDataByStep(step, values, currentFormId, currentUser.user_id);
  //       defaultBehaviour();
  //   }
  // }

  if (step === childrenArray.length) {
    return <SubmitSuccess />
  }

  return (
    <>
    <StepperComponent step={step} setStep={setStep} childrenArray={childrenArray} completed={completed} currentFormId={currentFormId} setCurrentFormId={setCurrentFormId} />
          
    {React.cloneElement(currentChild, { parentState: { step, setStep, isLastStep, handleComplete, ...props } })}
    {/* <CustomStepButton
      step={step}
      // isSubmitting={formik.isSubmitting}
      setStep={setStep}
      isLastStep={isLastStep}
      // formikSubmit={formik.submitForm}
    /> */}
    </>
      
  )
}

export default FormikStepper