import { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import {
  matchCompanyFields,
  matchContactFields,
} from '../../../Utils/formFunctionHelpers';
import CompanyInformationCompany from './CompanyInformationCompany';
import CompanyInformationContacts from './CompanyInformationContacts';
import Loading from '../../UIComponents/Loading/Loading';
import {
  end_point,
  api_prefix_form,
  FETCH_HEADER,
  getCurrentMode,
  MODE_REACT_ONLY,
  MODE_REACT_API,
} from '../../../Constants/Constants';
import CustomStepButton from '../../UIComponents/Button/CustomStepButton';

/**
 * Wrapper for Contacts and Company components
 *
 * Wrapper for Contacts and Company components,
 * with fetch and prefill data operation.
 *
 * Props:
 *  - otherProps: any other props passing down from
 *      FormikStepper components, including formik props of formik
 *      library (such as "formik.values", "formik.setFieldValue");
 *  - formField: the form field in formModels/formFieldModel.js
 */
const CompanyInformation = ({ formik, isStartNewForm }) => {
  const { currentFormId, furthestPage } = useContext(MembershipContext); // current chosen form id
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectModeAndFetch = () => {
      // Once we have API set up ready, we don't need the
      // fake data anymore, and can remove these pre-process.
      // it is mainly for if running the application
      // only react without server.

      // just for React only testing.
      // let currentFormId = 'form_1';

      let url_prefix_local;
      let url_suffix_local = '';
      // If running on localhost:3000
      if (getCurrentMode() === MODE_REACT_ONLY) {
        url_prefix_local = 'membership_data'; // --> public/membership_data/
        url_suffix_local = '.json'; // --> it is the fake json file
      }
      // If running on localhost:8090 or any other not on localhost:3000
      // Once we have the API ready running on production,
      // will use the correct domain name rather than localhost:8090
      if (getCurrentMode() === MODE_REACT_API) {
        url_prefix_local = api_prefix_form;
      }
      // If the current form id exsits
      if (currentFormId) {
        // Using promise pool, because in first step,
        // need to get company data, and contacts data
        let pool = [
          fetch(
            url_prefix_local +
              `/${currentFormId}/` +
              end_point.organizations +
              url_suffix_local,
            { headers: FETCH_HEADER }
          ),
          fetch(
            url_prefix_local +
              `/${currentFormId}/` +
              end_point.contacts +
              url_suffix_local,
            { headers: FETCH_HEADER }
          ),
        ];
        Promise.all(pool)
          .then((res) => Promise.all(res.map((r) => r.json())))
          .then(([organizations, contacts]) => {
            // Matching the field data
            if (organizations[0]) {
              // the organization data returned is always an
              // array of one object, that is why using [0]
              // Call the the function to map the retrived
              // organization backend data to fit frontend
              let tempOrg = matchCompanyFields(organizations[0]);
              // Call the setFieldValue of Formik, to set
              // organization field with the mapped data,
              // if nested, it will automatically map the
              // properties and values
              formik.setFieldValue('organization', tempOrg);
            }
            if (contacts.length) {
              // Call the the function to map the retrived contacts
              // (company representative, marketing rep, accounting rep)
              // backend data to fit frontend
              let tempContacts = matchContactFields(contacts);
              // Prefill Data --> Call the setFieldValue of Formik,
              // to set representative field with the mapped data,
              // if nested, it will automatically map the properties and values
              formik.setFieldValue('representative', tempContacts);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    if (isStartNewForm) {
      if (
        furthestPage.index > 1 &&
        !formik.values.organization?.id &&
        window.location.hash === '#company-info'
        // the last condition is to avoid "can't perform a React state update on unmounted component" error
      ) {
        // This means user already submitted/finished this page, and comes back from a further page/step
        // so, we need to GET the info user submitted and if user changes anything,
        // we will use the organization_id from the GET to do the PUT to update the info.
        detectModeAndFetch();
        setLoading(false);
      } else {
        // This means this is the 1st time the user see this page,
        // or the user already got the organizations.id
        // no need to do any API call
        setLoading(false);
      }
    } else if (!formik.values.organization?.id) {
      // continue with an existing one, if there is no id saved locally
      // then it means this is the 1st time the user see this page
      // need to GET the data
      detectModeAndFetch();
    } else {
      // user already has the data, no need to do any API call
      setLoading(false);
    }
  }, [isStartNewForm, formik, currentFormId, furthestPage.index]);

  // If it is in loading status,
  // only return a loading spinning
  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="fw-600 h2">Company Information</h1>
      <p>
        Please complete your company information below. This should be the legal
        name and address of your organization.
      </p>
      <div className="align-center">
        <CompanyInformationCompany formik={formik} />
        <CompanyInformationContacts formik={formik} />
      </div>

      <CustomStepButton
        previousPage=""
        nextPage="/membership-level"
        pageIndex={1}
      />
    </form>
  );
};

export default CompanyInformation;
