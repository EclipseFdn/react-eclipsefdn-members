import React, { useState, useContext, useEffect } from "react";
import MembershipContext from "../../../Context/MembershipContext";
import { Formik, Form, FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import { validationSchema } from '../formModels/ValidationSchema';
import CustomStepButton from "../CustomStepButton";

const WorkingGroupsWrapper = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);

  const [loading, setLoading] = useState(true);

  const [ initialValues, setInitialValues ] = useState({
    workingGroups: [
      {
        id: "",
        workingGroup: "",
        participationLevel: "",
        effectiveDate: "",
        workingGroupRepresentative: {
          firstName: "",
          lastName: "",
          jobtitle: "",
          email: "",
          id: ""
        }
      }
    ]  
  });

  // console.log("how many renders of working groups")

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
    console.log("how many useEffect of working groups")
    if(currentFormId) {
      fetch(`membership_data/${currentFormId}/workingGroups.json`,{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then(resp => resp.json())
      .then(data => {
        // If have an array, I'll use iterate it
        if(data.length) {
          setInitialValues({workingGroups: matchWorkingGroupFields(data)});
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  const handleOnSubmit = async (values, formikBag) => {
    console.log(values)
    otherProps.parentState.handleComplete()
    otherProps.parentState.setStep(s=> s+1)
  }


  if(loading) {
    return "Loading..."
  }

  return (
    <>
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema[2]}
        onSubmit={handleOnSubmit}
      >
        {
          (formik) => (
            <Form>
              <FieldArray
                name="workingGroups"
                render={arrayHelpers => {
                  return(
                      <WorkingGroup formField={formField} arrayHelpers={arrayHelpers} formikProps={otherProps.parentState.formik} />
                  )
                }}
              >
              </FieldArray>
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

export default WorkingGroupsWrapper

