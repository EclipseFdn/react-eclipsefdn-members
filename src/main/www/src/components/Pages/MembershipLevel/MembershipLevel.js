import React, { useContext, useEffect, useState } from 'react';
import MembershipLevelFeeTable from './MembershipLevelFeeTable';
import MembershipContext from '../../../Context/MembershipContext';
import Loading from '../../UIComponents/Loading/Loading';
// import { mapMembershipLevel } from '../../../Utils/formFunctionHelpers';
import {
  api_prefix_form,
  FETCH_HEADER,
  membership_levels,
  newForm_tempId,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';

/**
 * Render membership select component (use React-Select), with fetch and prefill data operation
 *
 *  - Props:
 *    -  otherProps: any other props passing down from MultiStepForm and FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *    - formField: the form field in formModels/formFieldModel.js;
 */

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));

const MembershipLevel = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);
  // const { setFieldValue } = otherProps.parentState.formik;
  const { membershipLevel } = formField;
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  // Fetch data only once and prefill data, as long as
  // currentFormId, membershipLevel.name and setFieldValue
  // Function does not change, will not cause re-render again
  useEffect(() => {
    // All pre-process: if running without server,
    // use fake json data; if running with API, use API
    let url_prefix_local;
    let url_suffix_local = '';
    if (getCurrentMode() === MODE_REACT_ONLY) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '/form.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    // If the current form exsits, and it is not creating a new form
    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(url_prefix_local + `/${currentFormId}` + url_suffix_local, {
        headers: FETCH_HEADER,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data) {
            // mapMembershipLevel(): Call the the function to map
            // the retrived membership level backend data to fit frontend, and
            // setFieldValue(): Prefill Data --> Call the setFieldValue of
            // Formik, to set membershipLevel field with the mapped data
            // setFieldValue(
            //   membershipLevel.name,
            //   mapMembershipLevel(data[0]?.membership_level, membership_levels)
            // );
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentFormId, membershipLevel.name]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="align-center">
        <h1 className="fw-600 h2">Membership Level</h1>
        <p>
          Please Indicate the class of membership for which you are applying
        </p>
        <h2 className="fw-600 h3" id={membershipLevel.name}>
          What is your intended Membership Level?
        </h2>
        <div className="row">
          <div className="col-md-12">
            {/* <CustomSelectWrapper
              name={membershipLevel.name}
              renderComponent={DefaultSelect}
              options={membership_levels}
              ariaLabel={membershipLevel.name}
            /> */}
            <Autocomplete
              options={membership_levels}
              getOptionLabel={(option) => option.label}
              fullWidth={true}
              renderInput={(params) => {
                params.inputProps = {
                  ...params.inputProps,
                  'aria-labelledby': membershipLevel.name,
                };
                return (
                  <TextField
                    {...params}
                    label="Select a level"
                    placeholder="Select a level"
                    variant="outlined"
                    size="small"
                    required={true}
                    className={classes.textField}
                  />
                );
              }}
            />
          </div>
        </div>
        <MembershipLevelFeeTable />
      </div>

      <CustomStepButton
        previousPage="/company-info"
        nextPage="/working-groups"
      />
    </>
  );
};

export default MembershipLevel;
