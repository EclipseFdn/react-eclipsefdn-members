import { useState, useContext, useEffect } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import Loading from '../../UIComponents/Loading/Loading';
import {
  end_point,
  api_prefix_form,
  FETCH_HEADER,
  newForm_tempId,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';
import { FormikProvider } from 'formik';

/**
 * Wrapper for FieldArray of WorkingGroup component,
 * with fetch and prefill data operation
 *
 * Note: FieldArray is from Formik library that add/remove
 * easily in an array of same field inputs,
 * please refer to https://formik.org/docs/api/fieldarray
 *
 *  - Props:
 *    - workingGroupsData: working group options to choose from;
 *
 *    - otherProps: any other props passing down from FormikStepper components, including formik props of formik library (such as "formik.values", "formik.setFieldValue");
 *
 *    - formField: the form field in formModels/formFieldModel.js
 */

const WorkingGroupsWrapper = ({ formik, isStartNewForm, furthestPage }) => {
  const { currentFormId } = useContext(MembershipContext);
  const [isLoading, setIsLoading] = useState(true);
  const [workingGroupsUserJoined, setWorkingGroupsUserJoined] = useState([]);
  const [fullWorkingGroupList, setFullWorkingGroupList] = useState([]);

  // Fetch data only once and prefill data, as long as
  // fetchWorkingGroupsData Function does not change,
  // will not cause re-render again
  useEffect(() => {
    // Fetch the full availabe working group list that user can join
    const fetchAvailableFullWorkingGroupList = () => {
      fetch('workingGroups.json', { headers: FETCH_HEADER })
        .then((res) => res.json())
        .then((data) => {
          let options = data.working_groups.map((item) => ({
            label: item.name,
            value: item.id,
            participation_levels: item.participation_levels,
          }));
          setFullWorkingGroupList(options);
        });
    };

    fetchAvailableFullWorkingGroupList();
  }, []);

  useEffect(() => {
    // Fetch the working groups user has joined
    const fetchWorkingGroupsUserJoined = () => {
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
              const theGroupsUserJoined = matchWorkingGroupFields(
                data,
                fullWorkingGroupList
              );
              setWorkingGroupsUserJoined(theGroupsUserJoined);
              formik.setFieldValue('workingGroups', theGroupsUserJoined);
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };

    if (isStartNewForm) {
      if (
        furthestPage.index > 3 &&
        !formik.values.workingGroups[0]?.id &&
        window.location.pathname === '/working-groups'
        // the last condition is to avoid "can't perform a React state update on unmounted component" error
      ) {
        // This means user already submitted/finished this page, and comes back from a further page/step
        // so, we need to GET the info user submitted and if user changes anything,
        // we will use the organization_id from the GET to do the PUT to update the info.
        if (fullWorkingGroupList.length > 0) {
          fetchWorkingGroupsUserJoined();
        }
        setIsLoading(false);
      } else {
        // This means this is the 1st time the user see this page,
        // or the user already got the organizations.id
        // no need to do any API call
        setIsLoading(false);
      }
    } else if (!formik.values.workingGroups[0]?.id) {
      // continue with an existing one
      if (fullWorkingGroupList.length > 0) {
        fetchWorkingGroupsUserJoined();
      }
    } else {
      setIsLoading(false);
    }
  }, [
    isStartNewForm,
    formik,
    currentFormId,
    furthestPage.index,
    fullWorkingGroupList,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <h1 className="fw-600 h2">Working Group</h1>
        <p>Please complete the following details for joining a Working Group</p>
        <div
          id="working-groups-page"
          className="align-center margin-top-50 margin-bottom-30"
        >
          <WorkingGroup
            formik={formik}
            workingGroupsUserJoined={workingGroupsUserJoined}
            fullWorkingGroupList={fullWorkingGroupList}
            isLoading={isLoading}
          />
        </div>

        <CustomStepButton
          previousPage="/membership-level"
          nextPage="/signing-authority"
          pageIndex={3}
        />
      </FormikProvider>
    </form>
  );
};

export default WorkingGroupsWrapper;
