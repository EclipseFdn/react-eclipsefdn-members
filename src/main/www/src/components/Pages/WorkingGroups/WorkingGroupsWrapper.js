import React, { useState, useContext, useEffect, useCallback } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import { FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import Loading from '../../UIComponents/Loading/Loading';
import {
  end_point,
  api_prefix_form,
  FETCH_HEADER,
  workingGroups,
  newForm_tempId,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';

/**
 * Wrapper for FieldArray of WorkingGroup component,
 * with fetch and prefill data operation
 *
 * Note: FieldArray is from Formik library that add/remove
 * easily in an array of same field inputs,
 * please refer to https://formik.org/docs/api/fieldarray
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from; passed from MultiStepForm component
 *
 *    - otherProps: any other props passing down from MultiStepForm and FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

// TEMP, for testing
const initialWorkingGroupsData = {
  working_groups: [
    {
      id: 'ascii_doc',
      name: 'AsciiDoc',
      participation_levels: [
        'AsciiDoc_level_a',
        'AsciiDoc_level_b',
        'AsciiDoc_level_c',
      ],
    },
    {
      id: 'ecd_tools',
      name: 'Eclipse Cloud Development Tools',
      participation_levels: [
        'ecd_tools_level_a',
        'ecd_tools_level_b',
        'ecd_tools_level_c',
      ],
    },
    {
      id: 'edge_native',
      name: 'Edge Native',
      participation_levels: [
        'edge_native_level_a',
        'edge_native_level_b',
        'edge_native_level_c',
        'edge_native_level_d',
      ],
    },
    {
      id: 'gemoc_rc',
      name: 'GEMOC RC',
      participation_levels: [
        'gemoc_rc_level_a',
        'gemoc_rc_level_b',
        'gemoc_rc_level_c',
      ],
    },
    {
      id: 'eclipse_iot',
      name: 'Eclipse IoT',
      participation_levels: ['iot_level_a', 'iot_level_b', 'iot_level_c'],
    },
    {
      id: 'jakarta_ee',
      name: 'Jakarta EE',
      participation_levels: [
        'jakarta_ee_level_a',
        'jakarta_ee_level_b',
        'jakarta_ee_level_c',
      ],
    },
    {
      id: 'openadx',
      name: 'OpenADx',
      participation_levels: [
        'OpenADx_level_a',
        'OpenADx_level_b',
        'OpenADx_level_c',
      ],
    },
    {
      id: 'opengenesis',
      name: 'OpenGENESIS',
      participation_levels: [
        'OpenGENESIS_level_a',
        'OpenGENESIS_level_b',
        'OpenGENESIS_level_c',
      ],
    },
    {
      id: 'openhwgroup',
      name: 'OpenHW Group',
      participation_levels: [
        'OpenHW_level_a',
        'OpenHW_level_b',
        'OpenHW_level_c',
      ],
    },
    {
      id: 'openmdm',
      name: 'OpenMDM',
      participation_levels: [
        'OpenMDM_level_a',
        'OpenMDM_level_b',
        'OpenMDM_level_c',
      ],
    },
    {
      id: 'openmobility',
      name: 'OpenMobility',
      participation_levels: [
        'OpenMobility_level_a',
        'OpenMobility_level_b',
        'OpenMobility_level_c',
      ],
    },
    {
      id: 'openpass',
      name: 'OpenPass',
      participation_levels: ['OpenPass_1', 'OpenPass_2', 'OpenPass_3'],
    },
    {
      id: 'science',
      name: 'Science',
      participation_levels: ['Science_A', 'Science_B', 'Science_C'],
    },
    {
      id: 'sparkplug',
      name: 'Sparkplug',
      participation_levels: [
        'Sparkplug_A',
        'Sparkplug_B',
        'Sparkplug_C',
        'Sparkplug_D',
      ],
    },
    {
      id: 'tangle_ee',
      name: 'Tangle EE',
      participation_levels: ['level_a', 'level_b', 'level_c'],
    },
    {
      id: 'eclipse_ide',
      name: 'Eclipse IDE',
      participation_levels: ['level_a', 'level_b', 'level_c'],
    },
    {
      id: 'eclipse_org',
      name: 'Other',
      participation_levels: ['level_a', 'level_b', 'level_c'],
    },
  ],
};

const WorkingGroupsWrapper = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);
  // const { setFieldValue } = otherProps.parentState.formik;
  const [loading, setLoading] = useState(false);
  const [workingGroupsData, setWorkingGroupsData] = useState(
    initialWorkingGroupsData
  );

  // Fetch existing form data

  const fetchWorkingGroupsData = useCallback(() => {
    // All pre-process: if running without server,
    // use fake json data; if running with API, use API
    let url_prefix_local;
    let url_suffix_local = '';
    if (getCurrentMode() === MODE_REACT_ONLY) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    // If the current form exsits, and it is not creating a new form
    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(
        url_prefix_local +
          `/${currentFormId}/` +
          end_point.working_groups +
          url_suffix_local,
        { headers: FETCH_HEADER }
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.length) {
            // matchWorkingGroupFields(): Call the the function to map
            // the retrived working groups backend data to fit frontend, and
            // setFieldValue(): Prefill Data --> Call the setFieldValue
            // of Formik, to set workingGroups field with the mapped data
            // setFieldValue(
            //   workingGroups,
            //   matchWorkingGroupFields(data, workingGroupsData)
            // );
            // setWorkingGroupsData(
            let a = matchWorkingGroupFields(data, workingGroupsData);
            // console.log(a)
            // );
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch data only once and prefill data, as long as
  // fetchWorkingGroupsData Function does not change,
  // will not cause re-render again
  useEffect(() => {
    // Fetch existing form data
    fetchWorkingGroupsData();
  }, [fetchWorkingGroupsData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="fw-600 h2">Working Group</h1>
      <p>Please complete the following details for joining a Working Group</p>
      <div
        id="working-groups-page"
        className="align-center margin-top-50 margin-bottom-30"
      >
        <FieldArray
          name={workingGroups}
          render={(arrayHelpers) => {
            return (
              <WorkingGroup
                formField={formField}
                arrayHelpers={arrayHelpers}
                workingGroupsData={workingGroupsData}
                // formikProps={otherProps.parentState.formik}
              />
            );
          }}
        ></FieldArray>
      </div>

      <CustomStepButton
        previousPage="/membership-level"
        nextPage="/signing-authority"
      />
    </>
  );
};

export default WorkingGroupsWrapper;
