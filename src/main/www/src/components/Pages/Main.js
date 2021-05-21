import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import SignIn from './SignIn/SignIn';
import {
  COMPANY_INFORMATION,
  MEMBERSHIP_LEVEL,
  REVIEW,
  SIGNING_AUTHORITY,
  WORKING_GROUPS,
  PAGE_STEP,
} from '../../Constants/Constants';
import {
  formField,
  initialValues,
} from '../UIComponents/FormComponents/formModels/formFieldModel';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Review from './Review/Review';
import Step from '../UIComponents/Steppers/Step';
import SignInIntroduction from './SignIn/SignInIntroduction';
import SubmitSuccess from '../UIComponents/FormComponents/SubmitSuccess';
import { validationSchema } from '../UIComponents/FormComponents/formModels/ValidationSchema';
import { useHistory } from 'react-router-dom';

export default function Main({ furthestPage, setFurthestPage }) {
  const history = useHistory();

  const goToNextStep = (pageIndex, nextPage) => {
    if (furthestPage.index <= pageIndex)
      setFurthestPage({ index: pageIndex + 1, pathName: nextPage });
    history.push(nextPage);
  };

  const formikCompanyInfo = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[0],
    onSubmit: (values) => {
      goToNextStep(1, '/membership-level');
    },
  });

  const formikMembershipLevel = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[1],
    onSubmit: (values) => {
      goToNextStep(2, '/working-groups');
    },
  });

  const formikWorkingGroups = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema[2],
    onSubmit: (values) => {
      goToNextStep(3, '/signing-authority');
    },
  });

  const formikSigningAuthority = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema[3],
    onSubmit: (values) => {
      goToNextStep(4, '/review');
    },
  });

  // generate the step options above the form
  const renderStepper = () => (
    <div className="stepper">
      <Step title="Sign In" index={-1} currentStep={-1} pathName="/signIn" />

      {PAGE_STEP.map((pageStep, index) => {
        return (
          <Step
            key={index}
            title={pageStep.props.label}
            index={index}
            currentStep={-1}
            pathName={pageStep.props.pathName}
          />
        );
      })}
    </div>
  );

  return (
    <div className="container eclipseFdn-membership-webform">
      <>
        {window.location.pathname === '/' ||
        window.location.pathname === '/signIn' ? (
          <SignInIntroduction />
        ) : null}

        {renderStepper()}

        <Switch>
          <Route exact path="/">
            <Redirect to="/signIn" />
          </Route>

          <Route exact path="/signIn">
            <SignIn formField={formField} label={COMPANY_INFORMATION} />
          </Route>

          <Route path="/company-info">
            {
              // stop users visiting steps/pages that are not able to edit yet
              furthestPage.index >= 1 ? (
                <CompanyInformation
                  label={COMPANY_INFORMATION}
                  formik={formikCompanyInfo}
                />
              ) : (
                // if uses are not allowed to visit this page,
                // then will be brought back to the furthest they can visit
                <Redirect to={furthestPage.pathName} />
              )
            }
          </Route>

          <Route path="/membership-level">
            {furthestPage.index >= 2 ? (
              <MembershipLevel
                formik={formikMembershipLevel}
                label={MEMBERSHIP_LEVEL}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>

          <Route path="/working-groups">
            {furthestPage.index >= 3 ? (
              <WorkingGroupsWrapper
                formField={formField}
                label={WORKING_GROUPS}
                formik={formikWorkingGroups}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>

          <Route path="/signing-authority">
            {furthestPage.index >= 4 ? (
              <SigningAuthority
                formField={formField}
                label={SIGNING_AUTHORITY}
                formik={formikSigningAuthority}
              />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>

          <Route path="/review">
            {furthestPage.index >= 5 ? (
              <Review formField={formField} label={REVIEW} />
            ) : (
              <Redirect to={furthestPage.pathName} />
            )}
          </Route>
          <Route path="/submitted">
            <SubmitSuccess />
          </Route>
        </Switch>
      </>
    </div>
  );
}
