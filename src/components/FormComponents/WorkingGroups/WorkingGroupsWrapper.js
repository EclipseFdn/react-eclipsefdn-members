import React, { useState, useContext, useEffect } from "react";
import MembershipContext from "../../../Context/MembershipContext";
import { FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import { initialValues } from '../../FormComponents/formModels/formFieldModel';

const WorkingGroupsWrapper = ({ formField, setInitials, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);

  const [loading, setLoading] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

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
          setInitials({...initialValues, workingGroups: matchWorkingGroupFields(data)})
        }

        setLoading(false);
      })
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  if(loading) {
    return "Loading..."
  }

  return (
    <>
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
    <FieldArray
      name="workingGroups"
      render={arrayHelpers => {
        return(
            <WorkingGroup formField={formField} arrayHelpers={arrayHelpers} formikProps={otherProps.parentState.formik} />
        )
      }}
    >
    </FieldArray>
    </div>
    </>
  );
};

export default WorkingGroupsWrapper

