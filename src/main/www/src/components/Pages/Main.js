import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
import MembershipContext from '../../Context/MembershipContext';

export default function Main() {
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
      <MembershipContext.Consumer>
        {({ furthestPage }) => (
          // create navigation structure/logic for the whole project
          <Router>
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
                      formField={formField}
                      label={COMPANY_INFORMATION}
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
                    formField={formField}
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
          </Router>
        )}
      </MembershipContext.Consumer>
    </div>
  );
}
