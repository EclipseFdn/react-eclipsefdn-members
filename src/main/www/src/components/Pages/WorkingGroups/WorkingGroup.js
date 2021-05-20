import React, { useContext } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
// import CustomSelectWrapper from '../../UIComponents/Inputs/CustomSelect/CustomSelectWrapper';
import WorkingGroupParticipationLevel from './WorkingGroupParticipationLevel';
import WorkingGroupEffectiveDate from './WorkingGroupEffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';
import { deleteData } from '../../../Utils/formFunctionHelpers';
import {
  end_point,
  WORKING_GROUPS,
  workingGroups,
} from '../../../Constants/Constants';
// import DefaultSelect from '../../UIComponents/Inputs/CustomSelect/DefaultSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField } from '@material-ui/core';
import { initialValues } from '../../UIComponents/FormComponents/formModels/formFieldModel';

/**
 * Wrapper for Working Group Selector,
 * Participation Level selector, WorkingGroupEffectiveDate input,
 * and WorkingGroups Representative inputs components
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from; passed from MultiStepForm component to WorkingGroupsWrapper and to here
 *
 *    - arrayHelpers: from Formik library, passed from WorkingGroupsWrapper component, includes all array operations for inputs, please refer to https://formik.org/docs/api/fieldarray#fieldarray-helpers
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 14,
    marginTop: 6,
    backgroundColor: 'white',
  },
}));

console.log(workingGroups);

const WorkingGroup = ({ formField, workingGroupsData, arrayHelpers }) => {
  const { workingGroups } = initialValues;
  const { currentFormId } = useContext(MembershipContext);
  const classes = useStyles();
  console.log(workingGroupsData);

  const each_workingGroupField = {
    id: '',
    workingGroup: '',
    participationLevel: '',
    effectiveDate: '',
    workingGroupRepresentative: {
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: '',
      id: '',
    },
  };

  const removeWorkingGroupCall = (arrayHelpersRemove, index, id) => {
    // Call API to remove
    console.log('you called DELETE method with id: ' + id);
    deleteData(
      currentFormId,
      end_point.working_groups,
      id,
      arrayHelpersRemove,
      index
    );
  };

  return (
    <>
      {workingGroups &&
        workingGroups.length > 0 &&
        workingGroups.map((workingGroup, index) => (
          <div key={index}>
            <h2
              className="h4 fw-600"
              id={`${workingGroups}.${index}.workingGroup`}
            >
              Which working group would you like to join?{' '}
              <span className="orange-star">*</span>{' '}
            </h2>
            {/* <CustomSelectWrapper
              label={WORKING_GROUPS}
              name={`${workingGroups}.${index}.workingGroup`}
              participationLevel={`${workingGroups}.${index}.participationLevel`}
              srcData={workingGroups}
              options={workingGroupsData}
              renderComponent={DefaultSelect}
              ariaLabel={`${workingGroups}.${index}.workingGroup`}
            /> */}
            <Autocomplete
              options={workingGroupsData}
              getOptionLabel={(option) => option.label}
              // defaultValue={workingGroupsData[0]}
              fullWidth={true}
              renderInput={(params) => {
                params.inputProps = {
                  ...params.inputProps,
                  'aria-labelledby': `${workingGroups}.${index}.workingGroup`,
                };

                return (
                  <TextField
                    {...params}
                    label={WORKING_GROUPS}
                    placeholder="Select a group"
                    variant="outlined"
                    size="small"
                    required={true}
                    className={classes.textField}
                  />
                );
              }}
            />

            {workingGroup.workingGroup &&
            workingGroup.workingGroup.value !== '' ? (
              <>
                <WorkingGroupParticipationLevel
                  name={`${workingGroups}.${index}.participationLevel`}
                  workingGroup={workingGroup.workingGroup}
                />
                <WorkingGroupEffectiveDate
                  name={`${workingGroups}.${index}.effectiveDate`}
                  label="Effective Date"
                />
                <WorkingGroupsRepresentative
                  name={`${workingGroups}.${index}.workingGroupRepresentative`}
                  formField={formField}
                  label="Working Group Representative"
                />
              </>
            ) : null}
            {workingGroups.length > 1 && (
              <div className="text-center margin-bottom-20">
                <button
                  className="btn btn-secondary padding-15"
                  type="button"
                  onClick={() =>
                    removeWorkingGroupCall(
                      arrayHelpers.remove,
                      index,
                      workingGroups[index].id
                    )
                  }
                >
                  Remove this group
                </button>
              </div>
            )}
          </div>
        ))}
      <div className="text-center margin-bottom-20">
        <button
          className="btn btn-secondary padding-15"
          type="button"
          onClick={() => arrayHelpers.push(each_workingGroupField)}
        >
          Add another working group
        </button>
      </div>
    </>
  );
};

export default WorkingGroup;
