import React, { useState } from "react";
import FormikStepper from "./forms/FormikStepper";
import FormFirstStep from "./forms/FormFirstStep";
import FormSecondStep from "./forms/FormSecondStep";
import FormSuccess from "./forms/FormSuccess";

const MultiStepCopy = () => {
  const formData = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: ""
  };

  const localFormData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {...formData}
  const [formDataStates, setFormDataStates] = useState(localFormData)

  // useEffect(() => {
  //   if (localStorage.getItem('userData')) {
  //     // localStorage.setItem('userData', JSON.stringify(localFormData))
  //     setFormDataStates(localFormData)
  //   }

  // }, [localFormData])
  
  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }

  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={{ ...formDataStates }}
        onSubmit={handleSubmit}
        formDataStates={formDataStates}
        setFormDataStates={setFormDataStates}
        // validate={validate}
      >

        <FormFirstStep label="first" />
        <FormSecondStep label="second" />
        <FormSuccess label="third" previewData={formDataStates} />

      </FormikStepper>
    </>
  )
};

export default MultiStepCopy